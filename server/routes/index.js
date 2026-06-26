import express from "express";
const router = express.Router();

import purchaseOrderRoutes from "./purchaseOrderRoutes.js";

// mount feature routes here
router.use("/purchase-orders", purchaseOrderRoutes);

export default router;
