import { pool } from "../config/db.js";
import { AppError } from "../middleware/errors/AppError.js";

export const getPurchaseOrdersService = async () => {
  const client = await pool.connect();
  try {
    await client.query("BEGIN");
    const limit = 20;
    const offset = 0;
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

    query += ` ORDER BY po.created_at DESC`;

    params.push(limit);
    query += ` LIMIT $${params.length}`;

    params.push(offset);
    query += ` OFFSET $${params.length}`;

    const result = await pool.query(query, params);

    return {
      success: true,
      count: result.rows.length,
      purchase_orders: result.rows,
    };
  } catch (err) {
    await client.query("ROLLBACK");
    throw err;
  } finally {
    client.release();
  }
};
