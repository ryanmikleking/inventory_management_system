import { useEffect, useState } from "react";
import {
  getPurchaseOrders,
  getSinglePurchaseOrder,
  extractPurchaseOrder,
  createPurchaseOrder,
  updatePurchaseOrderImages,
} from "../../api/axiosPurchaseOrderServices";

export const useUpdatePurchaseOrdersService = () => {
  const [updateLoading, setUpdateLoading] = useState(false);
  const updateImages = async (data) => {
    setUpdateLoading(true);
    try {
      const res = await updatePurchaseOrderImages(data);
      console.log(res);
      return res;
    } catch (error) {
      console.error(error);
    } finally {
      setUpdateLoading(false);
    }
  };

  return { updateLoading, updateImages };
};
export const useCreatePurchaseOrderService = () => {
  const [createLoading, setCreateLoading] = useState(false);
  const createOrder = async (formData) => {
    setCreateLoading(true);
    try {
      const res = await createPurchaseOrder(formData);
      console.log(res);
      return res;
    } catch (error) {
      console.error(error);
    } finally {
      setCreateLoading(false);
    }
  };
  return { createLoading, createOrder };
};
export const useGetPurchaseOrdersService = () => {
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
  const [extractLoading, setExtractLoading] = useState(false);
  const [error, setError] = useState(null);

  const uploadPurchaseOrder = async (file) => {
    setExtractLoading(true);
    setError(null);
    console.log(
      "File passed to uploadPurchaseOrder: " + file,
      file instanceof File,
    );
    try {
      const formData = new FormData();
      formData.append("purchaseOrderFile", file);
      const { status, data } = await extractPurchaseOrder(formData);
      // console.log(status, data);

      if (status !== 200) {
        throw new Error("Purchase Order Submit Failed");
      }
      console.log("this is hook data: " + data.data);
      return data;
    } catch (err) {
      setError(err.message);
    } finally {
      setExtractLoading(false);
    }
  };

  return {
    uploadPurchaseOrder,
    error,
    extractLoading,
  };
};
