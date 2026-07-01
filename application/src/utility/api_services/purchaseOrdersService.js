import { useEffect, useState } from "react";
import { getPurchaseOrders } from "../../api/uploadPurchaseOrders";
import { getSinglePurchaseOrder } from "../../api/uploadSinglePurchaseOrder";

export const usePurchaseOrdersService = () => {
  const [purchaseOrders, setPurchaseOrders] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const [success, data] = await getPurchaseOrders();
      setPurchaseOrders(data.purchase_orders);
      console.log(success);
    };

    fetchData();
  }, []);
  return purchaseOrders;
};
export const useSinglePurchaseOrderService = (poId) => {
  const [purchaseOrder, setPurchaseOrder] = useState(null);

  useEffect(() => {
    if (!poId) return;

    const fetchData = async () => {
      const [success, data] = await getSinglePurchaseOrder(poId);

      if (success) {
        setPurchaseOrder(data);
      }
    };

    fetchData();
  }, [poId]);

  return purchaseOrder;
};
