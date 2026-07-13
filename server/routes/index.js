import express from "express";
const router = express.Router();

import purchaseOrderRoutes from "./purchaseOrderRoutes.js";
import fileRoutes from "./fileRoutes.js";
// mount feature routes here
router.use("/purchase-orders", purchaseOrderRoutes);
router.use("/file-upload", fileRoutes);

export default router;
