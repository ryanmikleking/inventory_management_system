import dotenv from "dotenv";
dotenv.config({
  path:
    process.env.DB_HOST === "production" ? ".env.docker" : ".env.development",
});
import { updateImagesService } from "../services/updateImagesService.js";
import { AppError } from "../middleware/errors/AppError.js";
import * as attachmentService from "../services/attachmentService.js";

export const uploadPOImage = async (req, res) => {
  try {
    const { poId, purchase_order_number } = req.body;

    const filePath = await updateImagesService(
      poId,
      purchase_order_number,
      req.files,
    );

    return res.json({
      success: true,
      filePath,
    });
  } catch (err) {
    console.error("PO image upload failed:", err);

    if (err instanceof AppError) {
      return res.status(err.statusCode).json({
        success: false,
        error: err.message,
      });
    }

    return res.status(500).json({
      success: false,
      error: "Failed to upload purchase order images.",
    });
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
