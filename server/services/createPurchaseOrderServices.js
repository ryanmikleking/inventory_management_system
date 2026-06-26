import { pool } from "../config/db.js";
import { AppError } from "../middleware/errors/AppError.js";
export const createPurchaseOrderService = async (data) => {
  console.log(data);
  const client = await pool.connect();

  try {
    const {
      company_name,
      purchase_order_number,
      notes,
      quality_check,
      products,
    } = data;
    if (!company_name || !purchase_order_number) {
      throw new AppError("Missing rrequired fields", 400);
    }

    if (!Array.isArray(products) || products.length === 0) {
      throw new AppError("At least one product is required", 400);
    }

    await client.query("BEGIN");

    const existingCompany = await client.query(
      `
      SELECT 1 FROM purchase_orders
      WHERE purchase_order_number = $1
      `,
      [purchase_order_number],
    );

    if (existingCompany.rows.length > 0)
      throw new AppError("Purchase order already exists", 409);
    let companyId;
    const companyResult = await client.query(
      `
        SELECT company_id
        FROM companies
        WHERE LOWER(name) = LOWER($1)
        `,
      [company_name],
    );

    if (companyResult.rows.length === 0) {
      const newCompany = await client.query(
        `INSERT INTO companies (name)
        VALUES ($1)
        RETURNING company_id`,
        [company_name],
      );
      companyId = newCompany.rows[0].company_id;
    } else {
      companyId = companyResult.rows[0].company_id;
    }

    const poResult = await client.query(
      `INSERT INTO purchase_orders
        (company_id, purchase_order_number, notes, quality_check)
        VALUES ($1, $2, $3, $4)
        RETURNING *`,
      [companyId, purchase_order_number, notes, quality_check],
    );
    const po = poResult.rows[0];

    const insertedProducts = [];
    for (const p of products) {
      const productResult = await client.query(
        `INSERT INTO purchase_order_products
        (po_id, product_name, quantity, weight)
        VALUES ($1, $2, $3, $4)
        RETURNING *`,
        [po.po_id, p.product_name, p.quantity, p.weight],
      );
      insertedProducts.push(poResult.rows[0]);
    }

    await client.query("COMMIT");
    return {
      ...po,
      products: insertedProducts,
    };
  } catch (err) {
    await client.query("ROLLBACK");
    throw err;
  } finally {
    client.release();
  }
};
