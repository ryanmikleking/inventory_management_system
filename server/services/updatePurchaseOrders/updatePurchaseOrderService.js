import { pool } from "../../config/db.js";
import { updatePurchaseOrder } from "./purchaseOrderRepository.js";
import { updatePurchaseOrderProduct } from "./purchaseOrderProductRepository.js";

export const updatePurchaseOrderService = async (poId, data) => {
  const client = await pool.connect();

  try {
    await client.query("BEGIN");
    const quality_check = !data.discrepancy;

    const updatedPO = await updatePurchaseOrder(client, poId, {
      purchase_order_number: data.purchase_order_number,
      internal_po_number: data.internal_po_number,
      quality_check,
    });

    if (!updatedPO) {
      throw new Error(`Purchase order ${poId} was not found`);
    }

    const updatedProducts = [];

    for (const product of data.products || []) {
      const updatedProduct = await updatePurchaseOrderProduct(
        client,
        product,
        poId,
      );

      if (!updatedProduct) {
        throw new Error(`Product ${product.product_id} was not found`);
      }

      updatedProducts.push(updatedProduct);
    }

    await client.query("COMMIT");

    return {
      po: updatedPO,
      products: updatedProducts,
    };
  } catch (error) {
    await client.query("ROLLBACK");

    throw error;
  } finally {
    client.release();
  }
};
