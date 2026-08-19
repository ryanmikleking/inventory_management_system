import {
  findById,
  findByPurchaseOrderId,
} from "../services/attachmentRepository.js";
import * as minio from "./minioService.js";
import fs from "fs";

export const getPurchaseOrderAttachments = async (poId) => {
  return await findByPurchaseOrderId(poId);
};

export const streamAttachment = async (attachmentId) => {
  const attachment = await findById(attachmentId);

  if (!attachment) {
    throw new Error("Attachment not found");
  }

  const stream = await minio.downloadFile(attachment.file_path);

  const out = fs.createWriteStream("./test.jpg");

  stream.pipe(out);

  out.on("finish", () => {
    console.log("Saved", attachment.file_type);
  });

  return {
    stream,

    mimeType: attachment.file_type || "application/octet-stream",

    fileName: attachment.file_name,
  };
};
