import { uploadFile } from "./minioService.js";
import { attachmentRepository } from "./attachmentRepository.js";
import { pool } from "../config/db.js";

export const updateImagesService = async (
  poId,
  purchase_order_number,
  files,
) => {
  if (!files || files.length === 0) {
    throw new Error("No image files were provided.");
  }

  const client = await pool.connect();
  const uploadedFiles = [];

  try {
    await client.query("BEGIN");

    for (const file of files) {
      console.log("Uploading image:", file.originalname);

      console.log("Image received:", {
        name: file.originalname,
        mimetype: file.mimetype,
        size: file.size,
        bufferLength: file.buffer?.length,
        bufferStart: file.buffer?.subarray(0, 8).toString("hex"),
      });

      const objectKey = await uploadFile(file, poId);

      if (!objectKey) {
        throw new Error(`Image upload failed: ${file.originalname}`);
      }

      const attachment = {
        po_id: poId,
        bucket: "po-attachments",
        file_path: objectKey,
        file_name: file.originalname,
        file_type: file.mimetype,
        file_size: file.size,
      };

      await attachmentRepository(attachment);

      uploadedFiles.push(attachment);
    }

    await client.query("COMMIT");

    return uploadedFiles;
  } catch (err) {
    await client.query("ROLLBACK");
    throw err;
  } finally {
    client.release();
  }
};
