import { pool } from "../config/db.js";
export const attachmentRepository = async ({
  po_id,
  bucket,
  file_path,
  file_name,
  file_type,
  file_size,
}) => {
  try {
    const query = `
        INSERT INTO purchase_order_attachments (
          po_id,
          file_name, 
          file_type,       
          file_path,        
          file_size,
          bucket
        )
        VALUES ($1, $2, $3, $4, $5, $6)
        RETURNING *;
    `;
    const values = [po_id, file_name, file_type, file_path, file_size, bucket];

    const { rows } = await pool.query(query, values);

    return rows[0];
  } catch (error) {
    console.error(error);
    return;
  }
};
export async function findByPurchaseOrderId(poId) {
  const { rows } = await pool.query(
    `
      SELECT
        attachment_id,
        file_name,
        file_type,
        file_path
      FROM purchase_order_attachments
      WHERE po_id = $1
      ORDER BY attachment_id;
    `,
    [poId],
  );
  rows.forEach((row) => {
    console.log("AttachmentRepo:", row.file_type);
  });
  return rows;
}
export const findById = async (attachmentId) => {
  const result = await pool.query(
    `
      SELECT *
      FROM purchase_order_attachments
      WHERE attachment_id = $1
    `,
    [attachmentId],
  );

  return result.rows[0];
};
