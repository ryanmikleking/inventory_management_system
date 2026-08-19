import { pool } from "../config/db.js";
import { AppError } from "../middleware/errors/AppError.js";
import { attachmentRepository } from "./attachmentRepository.js";
import { uploadFile } from "./minioService.js";
export const createPurchaseOrderService = async (data, files) => {
  const client = await pool.connect();

  try {
    const { company_name, purchase_order_number, notes, quality_check } = data;
    const products = JSON.parse(data.products);

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
        (po_id, product_name, quantity, measurement)
        VALUES ($1, $2, $3, $4)
        RETURNING *`,
        [po.po_id, p.product_name, p.quantity, p.weight],
      );
      insertedProducts.push(poResult.rows[0]);
    }
    const uploadedFiles = [];

    for (const file of files) {
      const file_path = await uploadFile(file, po.po_id);

      if (!file_path) return;

      uploadedFiles.push({
        po_id: po.po_id,
        bucket: "po-attachments",
        file_path,
        file_name: file.originalname,
        file_type: file.mimetype,
        file_size: file.size,
      });
    }

    uploadedFiles.forEach(async (file) => await attachmentRepository(file));
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
