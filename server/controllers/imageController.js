import dotenv from "dotenv";
dotenv.config({
  path:
    process.env.DB_HOST === "production" ? ".env.docker" : ".env.development",
});
import { updateImagesService } from "../services/updateImagesService.js";
import { AppError } from "../middleware/errors/AppError.js";
import * as attachmentService from "../services/attachmentService.js";
import { minioClient } from "../config/minio.js";
import fs from "fs";

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
export const getPurchaseOrderAttachments = async (req, res) => {
  const { poId } = req.params;

  const attachments = await attachmentService.getPurchaseOrderAttachments(poId);

  res.json({
    success: true,

    attachments,
  });
};
export const getAttachment = async (req, res) => {
  const { attachmentId } = req.params;

  const {
    stream,

    mimeType,

    fileName,
  } = await attachmentService.streamAttachment(attachmentId);

  res.setHeader("Content-Type", mimeType);

  res.setHeader("Content-Disposition", `inline; filename="${fileName}"`);

  stream.pipe(res);
};
// export const getAttachment = async (req, res) => {
//   try {
//     const { attachmentId } = req.params;

//     const { stream, mimeType, fileName } =
//       await attachmentService.streamAttachment(attachmentId);

//     console.log("mimeType:", mimeType);
//     console.log("fileName:", fileName);
//     console.log("stream pipe:", typeof stream.pipe);

//     const outputPath = `/tmp/test-${fileName}`;

//     const writeStream = fs.createWriteStream(outputPath);

//     stream.pipe(writeStream);

//     writeStream.on("finish", () => {
//       console.log("Saved file:", outputPath);

//       res.json({
//         success: true,
//         path: outputPath,
//       });
//     });

//     writeStream.on("error", (err) => {
//       console.error("Write error:", err);
//       res.status(500).json({
//         error: err.message,
//       });
//     });
//   } catch (err) {
//     console.error(err);
//     res.status(500).json({
//       error: err.message,
//     });
//   }
// };
