import { createPurchaseOrderService } from "../services/createPurchaseOrderServices.js";
import { getPurchaseOrdersService } from "../services/getPurchaseOrdersService.js";
import { getPurchaseOrderByIdService } from "../services/getPurchaseOrderByIdService.js";
import { AppError } from "../middleware/errors/AppError.js";
import asyncHandler from "../middleware/asyncHandler.js";
import { parsePurchaseOrder } from "../services/purchaseOrder/purchaseOrderParser.js";

export const createPurchaseOrder = async (req, res) => {
  try {
    const result = await createPurchaseOrderService(req.body);

    return res.status(201).json({
      success: true,
      purchase_order: result,
    });
  } catch (err) {
    if (err instanceof AppError) {
      return res.status(err.statusCode).json({
        success: false,
        error: err.message,
      });
    }
    console.error(err);
    return res.status(500).json({
      success: false,
      error: err.message,
    });
  }
};
export const getPurchaseOrders = async (req, res) => {
  try {
    const result = await getPurchaseOrdersService();

    return res.status(201).json({
      success: true,
      purchase_order: result,
    });
  } catch (err) {
    if (err instanceof AppError) {
      return res.status(err.statusCode).json({
        success: false,
        error: err.message,
      });
    }
    console.error(err);
    return res.status(500).json({
      success: false,
      error: err.message,
    });
  }
};
export const getPurchaseOrderById = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await getPurchaseOrderByIdService(id);

    return res.status(201).json({
      success: true,
      purchase_order: result,
    });
  } catch (err) {
    if (err instanceof AppError) {
      return res.status(err.statusCode).json({
        success: false,
        error: err.message,
      });
    }
    console.error(err);
    return res.status(500).json({
      success: false,
      error: err.message,
    });
  }
};
export const updatePurchaseOrder = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await getPurchaseOrderByIdService(id);

    return res.status(201).json({
      success: true,
      purchase_order: result,
    });
  } catch (err) {
    if (err instanceof AppError) {
      return res.status(err.statusCode).json({
        success: false,
        error: err.message,
      });
    }
    console.error(err);
    return res.status(500).json({
      success: false,
      error: err.message,
    });
  }
};
export const extractPurchaseOrder = asyncHandler(async (req, res) => {
  if (!req.file) {
    return res.status(400).json({
      success: false,
      message: "Purchase order file is required.",
    });
  }
  console.log("This is from Controller: ", req.file);
  const purchaseOrder = await parsePurchaseOrder(req.file.buffer);

  res.status(200).json({ status: "success", data: purchaseOrder });
});
