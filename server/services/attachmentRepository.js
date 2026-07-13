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
    console.log("attachment query started");
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
