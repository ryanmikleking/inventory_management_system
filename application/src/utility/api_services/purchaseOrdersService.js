import { useEffect, useState } from "react";
import {
  getPurchaseOrders,
  getSinglePurchaseOrder,
  extractPurchaseOrder,
} from "../../api/axiosPurchaseOrderServices";

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
export const useExtractPurchaseOrder = () => {
  const [automatedInput, setAutomatedInput] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const uploadPurchaseOrder = async (file) => {
    setLoading(true);
    setError(null);
    console.log(file instanceof File);

    try {
      const formData = new FormData();
      formData.append("purchaseOrderFile", file);
      console.log(typeof formData, formData);
      const [success, data] = await extractPurchaseOrder(formData);

      if (success) {
        setAutomatedInput(data);
      } else {
        setAutomatedInput(null);
        setError("Purchase Order Submit Failed!");
      }
    } catch (err) {
      setError(err.message);
      setAutomatedInput(null);
    } finally {
      setLoading(false);
    }
  };

  return {
    automatedInput,
    loading,
    error,
    uploadPurchaseOrder,
  };
};
