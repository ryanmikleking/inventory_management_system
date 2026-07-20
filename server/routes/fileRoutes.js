import express from "express";
import upload from "../middleware/upload.js";
import {
  uploadPOImage,
  getPurchaseOrderFiles,
} from "../controllers/imageController.js";

const router = express.Router();

// POST /api/files/upload
router.post("/", upload.array("files"), uploadPOImage);

// GET /api/files/signed/:key
router.get("/:poId", getPurchaseOrderFiles);

export default router;
