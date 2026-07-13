import express from "express";
import upload from "../middleware/upload.js";
import {
  uploadPOImage,
  uploadTestImage,
} from "../controllers/imageController.js";
import { attachmentRepository } from "../services/attachmentRepository.js";

const router = express.Router();

// POST /api/files/upload
router.post("/", upload.array("files"), uploadPOImage);
router.post("/test", uploadTestImage);

// GET /api/files/signed/:key
// router.get("/signed/:key", getSignedUrl);

export default router;
