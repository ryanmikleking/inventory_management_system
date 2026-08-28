import { createPurchaseOrderService } from "../services/createPurchaseOrderServices.js";
import { getPurchaseOrdersService } from "../services/getPurchaseOrdersService.js";
import { getPurchaseOrderByIdService } from "../services/getPurchaseOrderByIdService.js";
import { AppError } from "../middleware/errors/AppError.js";
import asyncHandler from "../middleware/asyncHandler.js";
import { parsePurchaseOrder } from "../services/purchaseOrder/purchaseOrderParser.js";
import { updatePurchaseOrderService } from "../services/updatePurchaseOrders/updatePurchaseOrderService.js";

export const createPurchaseOrder = async (req, res) => {
  try {
    const result = await createPurchaseOrderService(req.body, req.files);

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
    const page = Math.max(parseInt(req.query.page, 10) || 1, 1);

    const limit = Math.min(
      Math.max(parseInt(req.query.limit, 10) || 25, 1),
      100,
    );
    const search =
      typeof req.query.search === "string" ? req.query.search.trim() : "";
    const allowedSorts = {
      purchase_order_number: "po.purchase_order_number",
      internal_po_number: "po.internal_po_number",
      company_name: "c.name",
      created_at: "po.created_at",
    };

    const sort = allowedSorts[req.query.sort] || "po.created_at";

    const order = req.query.order?.toLowerCase() === "asc" ? "ASC" : "DESC";

    const company =
      typeof req.query.company === "string" ? req.query.company.trim() : "";

    let qualityCheck;

    if (req.query.quality_check === "true") {
      qualityCheck = true;
    } else if (req.query.quality_check === "false") {
      qualityCheck = false;
    }

    const result = await getPurchaseOrdersService({
      page,
      limit,
      search,
      sort,
      order,
      company,
      qualityCheck,
    });

    return res.status(200).json({
      success: true,
      purchase_orders: result.data,
      pagination: result.pagination,
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

    const {
      company_name,
      purchase_order_number,
      internal_po_number,
      discrepancy,
      products,
    } = req.body;

    console.log("Updating PO:", id);
    console.log("Update data:", req.body);

    const updatedPO = await updatePurchaseOrderService(id, {
      company_name,
      purchase_order_number,
      internal_po_number,
      discrepancy,
      products,
    });

    return res.status(200).json({
      success: true,
      purchase_order: updatedPO,
    });
  } catch (error) {
    console.error("Update PO error:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to update purchase order",
    });
  }
};
export const extractPurchaseOrder = asyncHandler(async (req, res) => {
  console.log("Controller Files:", req.files);
  const purchaseOrder = await parsePurchaseOrder(req.files);
  res.status(200).json({ status: "success", data: purchaseOrder });
});
