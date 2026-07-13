import { minioClient } from "../config/minio.js";

const bucketName = "po-attachments";

export const ensureBucket = async () => {
  const exists = await minioClient.bucketExists(bucketName);

  if (!exists) {
    await minioClient.makeBucket(bucketName);
    return `${bucketName} created ${Date.now()}`;
  }
  return `${bucketName} already created! 🎸`;
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
    await minioClient.putObject(bucketName, fileName, file.buffer, file.size);

    return fileName;
  } catch (error) {
    console.error("MinIO upload failed: ", error);
  }
};
