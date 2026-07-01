import { minioClient } from "../config/minioClient.js";

const bucketName = "po-attachments";

export const ensureBucket = async () => {
  const exists = await minioClient.bucketExists(bucketName);

  if (!exists) {
    await minioClient.makeBucket(bucketName);
  }
};

export const uploadFile = async (file, poId) => {
  const fileName = `po/${poId}/${Date.now()}-${file.originalname}`;

  await minioClient.putObject(bucketName, fileName, file.buffer, file.size);

  return fileName;
};
import { minioClient } from "../config/minioClient.js";

const bucketName = "po-attachments";

export const ensureBucket = async () => {
  const exists = await minioClient.bucketExists(bucketName);

  if (!exists) {
    await minioClient.makeBucket(bucketName);
  }
};

export const uploadFile = async (file, poId) => {
  const fileName = `po/${poId}/${Date.now()}-${file.originalname}`;

  await minioClient.putObject(bucketName, fileName, file.buffer, file.size);

  return fileName;
};
