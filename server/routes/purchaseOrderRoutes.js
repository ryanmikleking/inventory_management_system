import express from "express";
import upload from "../middleware/upload.js";
import {
  createPurchaseOrder,
  getPurchaseOrders,
  getPurchaseOrderById,
  updatePurchaseOrder,
  extractPurchaseOrder,
} from "../controllers/purchaseOrderController.js";

const router = express.Router();

router.post(
  "/extract",
  upload.single("purchaseOrderFile"),
  (req, res, next) => {
    console.log("posting to server ...");
    next();
  },
  extractPurchaseOrder,
);
router.post("/", createPurchaseOrder);
router.get("/", getPurchaseOrders);
router.get("/:id", getPurchaseOrderById);
router.put("/:id", updatePurchaseOrder);

export default router;
