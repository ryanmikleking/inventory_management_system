import express from "express";
import upload from "../middleware/upload.js";
import {
  uploadPOImage,
  getPurchaseOrderAttachments,
  getAttachment,
} from "../controllers/imageController.js";

const router = express.Router();

// POST /api/files/upload
router.post("/", upload.array("files"), uploadPOImage);

router.get("/:poId", getPurchaseOrderAttachments);

router.get("/streams/:attachmentId", getAttachment);

export default router;
