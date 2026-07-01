import express from "express";
import { upload } from "../middleware/multer.js";
import { uploadFile, getSignedUrl } from "../controllers/fileController.js";

const router = express.Router();

// POST /api/files/upload
router.post("/upload", upload.single("file"), uploadFile);

// GET /api/files/signed/:key
router.get("/signed/:key", getSignedUrl);

export default router;
