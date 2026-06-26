import { pool } from "../config/db.js";
import { AppError } from "../middleware/errors/AppError.js";

export const getPurchaseOrderByIdService = async (poId) => {
  const client = await pool.connect();
  try {
    const purchaseOrderResult = await client.query(
      `
      SELECT
        po.po_id,
        po.purchase_order_number,
        po.notes,
        po.quality_check,
        po.created_at,

        c.company_id,
        c.name AS company_name

      FROM purchase_orders po

      INNER JOIN companies c
        ON c.company_id = po.company_id

      WHERE po.po_id = $1
      `,
      [poId],
    );
    if (purchaseOrderResult.rows.length === 0) {
      throw new AppError("Purchase Order not found.", 404);
    }
    const productsResult = await client.query(
      `
      SELECT
        product_id,
        product_name,
        quantity,
        weight
      FROM purchase_order_products
      WHERE po_id = $1
      ORDER BY product_id
      `,
      [poId],
    );

    await client.query("COMMIT");
    return {
      po: purchaseOrderResult.rows[0],

      products: productsResult.rows,
    };
  } catch (err) {
    throw err;
  } finally {
    client.release();
  }
};
