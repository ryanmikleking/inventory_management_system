import dotenv from "dotenv";
dotenv.config({
  path:
    process.env.DB_HOST === "production" ? ".env.docker" : ".env.development",
});
import { minioClient } from "../config/minio.js";
import {
  attachmentRepository,
  findByPurchaseOrderId,
} from "../services/attachmentRepository.js";

export const ensureBucket = async () => {
  const exists = await minioClient.bucketExists(process.env.MINIO_BUCKET);

  if (!exists) {
    await minioClient.makeBucket(process.env.MINIO_BUCKET);
    return `${process.env.MINIO_BUCKET} created ${Date.now()}`;
  }
  return `${process.env.MINIO_BUCKET} already created! 🎸`;
};

export const uploadFile = async (file, poId) => {
  try {
    let fileName = `${file.originalname}`;
    if (
      fileName.toLowerCase().endsWith(".png") ||
      fileName.toLowerCase().endsWith(".jpg")
    ) {
      fileName = `image/${poId}/${Date.now()}-${fileName}`;
    } else {
      fileName = `po/${poId}/${Date.now()}-${fileName}`;
    }
    console.log(file.buffer);
    await minioClient.putObject(
      process.env.MINIO_BUCKET,
      fileName,
      file.buffer,
      file.size,
    );

    return fileName;
  } catch (error) {
    console.error("MinIO upload failed: ", error);
  }
};

export const getPurchaseOrderSignedUrls = async (poId) => {
  const bucket = process.env.MINIO_BUCKET;

  const attachments = await findByPurchaseOrderId(poId);

  await Promise.all(
    attachments.map((file) => minioClient.getObject(bucket, file.file_path)),
  );

  res.setHeader("Content-Type", file.fileType || "image/jpeg");

  stream.pipe(res);
};
