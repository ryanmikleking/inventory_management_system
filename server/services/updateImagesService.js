import { uploadFile } from "./minioService.js";
import { attachmentRepository } from "./attachmentRepository.js";
import { pool } from "../config/db.js";

export const updateImagesService = async (
  poId,
  purchase_order_number,
  files,
) => {
  //console.log(poId, files[0]);
  const client = await pool.connect();
  try {
    await client.query("BEGIN");
    const uploadedFiles = [];
    console.log(files);
    for (const file of files) {
      console.log(file[0]);
      const objectKey = await uploadFile(file, poId);

      if (!objectKey) return;
      uploadedFiles.push({
        po_id: poId,
        bucket: "po-attachments",
        file_path: objectKey,
        file_name: file.originalname,
        file_type: file.mimeType,
        file_size: file.size,
      });

      uploadedFiles.forEach(async (file) => await attachmentRepository(file));

      await client.query("COMMIT");
    }
  } catch (err) {
    await client.query("ROLLBACK");
    throw err;
  } finally {
    client.release();
  }
};
