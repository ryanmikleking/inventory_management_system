import dotenv from "dotenv";
dotenv.config({
  path:
    process.env.DB_HOST === "production" ? ".env.docker" : ".env.development",
});
import { updateImagesService } from "../services/updateImagesService.js";
import { AppError } from "../middleware/errors/AppError.js";
import { findByPurchaseOrderId } from "../services/attachmentRepository.js";
import { minioClient } from "../config/minio.js";

export const uploadPOImage = async (req, res) => {
  try {
    const { poId, purchase_order_number } = req.body;
    const files = req.files;

    const filePath = await updateImagesService(
      poId,
      purchase_order_number,
      files,
    );

    res.json({
      success: true,
      filePath,
    });
  } catch (err) {
    if (err instanceof AppError) {
      return res.status(err.statusCode).json({
        success: false,
        error: err.message,
      });
    }
  }
};
export const getPurchaseOrderFiles = async (req, res) => {
  try {
    const { poId } = req.params;

    const bucket = process.env.MINIO_BUCKET;

    const attachments = await findByPurchaseOrderId(poId);

    const streams = await Promise.all(
      attachments.map((file) => minioClient.getObject(bucket, file.file_path)),
    );
    res.setHeader("Content-Type", attachments.fileType || "image/jpeg");

    stream.pipe(res);
    res.json({
      success: true,
      files,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({
      message: "Unable to retrieve purchase order attachments.",
    });
  }
};
