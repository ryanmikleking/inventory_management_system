import { createPurchaseOrderService } from "../services/createPurchaseOrderServices.js";
import { getPurchaseOrdersService } from "../services/getPurchaseOrdersService.js";
import { getPurchaseOrderByIdService } from "../services/getPurchaseOrderByIdService.js";
import { AppError } from "../middleware/errors/AppError.js";

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
