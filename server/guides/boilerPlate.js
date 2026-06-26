import { pool } from "../config/db.js";

export async function getPurchaseOrders1(req, res) {
  try {
    const { company_id, limit = 20, offset = 0 } = req.query;

    let query = `
      SELECT
        po.po_id,
        po.company_id,
        po.purchase_order_number,
        po.notes,
        po.quality_check,
        po.created_at,
        c.name AS company_name
      FROM purchase_orders po
      JOIN companies c ON c.company_id = po.company_id
    `;

    const params = [];
    let whereAdded = false;

    // optional filter by company
    if (company_id) {
      params.push(company_id);
      query += ` WHERE po.company_id = $${params.length}`;
      whereAdded = true;
    }

    // ordering (uses your index!)
    query += ` ORDER BY po.created_at DESC`;

    // pagination
    params.push(limit);
    query += ` LIMIT $${params.length}`;

    params.push(offset);
    query += ` OFFSET $${params.length}`;

    const result = await pool.query(query, params);

    res.json({
      success: true,
      count: result.rows.length,
      purchase_orders: result.rows,
    });
  } catch (err) {
    console.error("GET PO error:", err);
    res.status(500).json({
      success: false,
      error: err.message,
    });
  }
}

export async function createPurchaseOrder(req, res) {
  const client = await pool.connect();
  const {
    companyId,
    compnay_name,
    purchase_order_number,
    notes,
    quality_check,
  } = req.body;

  try {
    // =========================
    // 1. EXTRACT REQUEST DATA
    // =========================

    // =========================
    // 2. ADVANCED VALIDATION
    // =========================
    if (!company_name || !purchase_order_number) {
      try {
        // =========================
        // FIND OR CREATE COMPANY
        // =========================

        const companyResult = await client.query(
          `
            SELECT company_id
            FROM companies
            WHERE LOWER(name) = LOWER($1)
          `,
          [company_name],
        );

        let companyId;

        if (companyResult.rows.length > 0) {
          companyId = companyResult.rows[0].company_id;
        } else {
          const newCompany = await client.query(
            `
              INSERT INTO companies (name)
              VALUES ($1)
              RETURNING company_id
            `,
            [company_name],
          );

          companyId = newCompany.rows[0].company_id;
        }
      } catch {
        return res.status(400).json({
          success: false,
          error: "error when inserting new company into db.",
        });
      }
    }

    if (!Array.isArray(products) || products.length === 0) {
      return res.status(400).json({
        success: false,
        error: "At least one product is required",
      });
    }

    // =========================
    // 3. START TRANSACTION
    // =========================
    await client.query("BEGIN");

    // =========================
    // 4. DUPLICATE CHECK
    // =========================
    const existing = await client.query(
      `SELECT po_id FROM purchase_orders
       WHERE purchase_order_number = $1`,
      [purchase_order_number],
    );

    if (existing.rows.length > 0) {
      await client.query("ROLLBACK");

      return res.status(409).json({
        success: false,
        error: "Purchase order number already exists",
      });
    }

    // =========================
    // 5. INSERT PURCHASE ORDER
    // =========================
    const poResult = await client.query(
      `INSERT INTO purchase_orders
       (company_id, purchase_order_number, notes, quality_check)
       VALUES ($1, $2, $3, $4)
       RETURNING *`,
      [company_id, purchase_order_number, notes, quality_check],
    );

    const po = poResult.rows[0];

    // =========================
    // 6. INSERT PRODUCTS
    // =========================
    const insertedProducts = [];

    for (const p of products) {
      const productResult = await client.query(
        `INSERT INTO purchase_order_products
         (po_id, product_name, quantity, weight)
         VALUES ($1, $2, $3, $4)
         RETURNING *`,
        [po.po_id, p.product_name, p.quantity, p.weight],
      );

      insertedProducts.push(productResult.rows[0]);
    }

    // =========================
    // 7. COMMIT TRANSACTION
    // =========================
    await client.query("COMMIT");

    // =========================
    // 8. RETURN RESPONSE
    // =========================
    return res.status(201).json({
      success: true,
      purchase_order: {
        ...po,
        products: insertedProducts,
      },
    });
  } catch (err) {
    // =========================
    // 9. ROLLBACK ON ERROR
    // =========================
    await client.query("ROLLBACK");

    console.error("Create PO error:", err);

    return res.status(500).json({
      success: false,
      error: err.message,
    });
  } finally {
    // =========================
    // 10. RELEASE DB CLIENT
    // =========================
    client.release();
  }
}
export async function getPurchaseOrderById(req, res) {
  try {
    const { id } = req.params;

    // =========================
    // 1. GET PURCHASE ORDER + COMPANY
    // =========================
    const poResult = await pool.query(
      `
      SELECT
        po.*,
        c.name AS company_name
      FROM purchase_orders po
      JOIN companies c ON c.company_id = po.company_id
      WHERE po.po_id = $1
      `,
      [id],
    );

    if (poResult.rows.length === 0) {
      return res.status(404).json({
        success: false,
        error: "Purchase order not found",
      });
    }

    const po = poResult.rows[0];

    // =========================
    // 2. GET PRODUCTS
    // =========================
    const productsResult = await pool.query(
      `
      SELECT *
      FROM purchase_order_products
      WHERE po_id = $1
      ORDER BY product_id ASC
      `,
      [id],
    );

    // =========================
    // 3. GET ATTACHMENTS (images)
    // =========================
    const attachmentsResult = await pool.query(
      `
      SELECT *
      FROM purchase_order_attachments
      WHERE po_id = $1
      ORDER BY attachment_id ASC
      `,
      [id],
    );

    // =========================
    // 4. GET PO FILE (PDF)
    // =========================
    const fileResult = await pool.query(
      `
      SELECT *
      FROM purchase_order_files
      WHERE po_id = $1
      LIMIT 1
      `,
      [id],
    );

    // =========================
    // 5. BUILD RESPONSE
    // =========================
    return res.json({
      success: true,
      purchase_order: {
        ...po,
        products: productsResult.rows,
        attachments: attachmentsResult.rows,
        po_file: fileResult.rows[0] || null,
      },
    });
  } catch (err) {
    console.error("GET purchase order by ID error:", err);

    return res.status(500).json({
      success: false,
      error: err.message,
    });
  }
}
