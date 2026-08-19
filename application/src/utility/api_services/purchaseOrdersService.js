import { useEffect, useState } from "react";
import {
  getPurchaseOrders,
  getSinglePurchaseOrder,
  extractPurchaseOrder,
  createPurchaseOrder,
  updatePurchaseOrderImages,
} from "../../api/axiosPurchaseOrderServices";
import { purchaseOrderFiles } from "../../api/axiosPurchaseOrderServices";

export const useUpdatePurchaseOrderImageService = () => {
  const [updateLoading, setUpdateLoading] = useState(false);
  const updateImages = async (data) => {
    setUpdateLoading(true);
    try {
      const res = await updatePurchaseOrderImages(data);

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

      return res;
    } catch (error) {
      console.error(error);
    } finally {
      setCreateLoading(false);
    }
  };
  return { createLoading, createOrder };
};
export const useGetPurchaseOrdersService = ({
  page = 1,
  limit = 20,
  search = "",
} = {}) => {
  const [purchaseOrders, setPurchaseOrders] = useState([]);
  const [pagination, setPagination] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        setError(null);

        const [success, data] = await getPurchaseOrders({
          page,
          limit,
          search,
        });
        console.log("HOOK DATA:", data);
        console.log("HOOK ORDERS:", data.purchase_orders);
        if (!success) {
          throw new Error("Failed to retrieve purchase orders");
        }

        setPurchaseOrders(data.purchase_orders);
        setPagination(data.pagination);
      } catch (err) {
        console.error(err);
        setError(err.message);
        setPurchaseOrders([]);
        setPagination(null);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [page, limit, search]);

  return {
    purchaseOrders,
    pagination,
    loading,
    error,
  };
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

  const uploadPurchaseOrder = async (files) => {
    setExtractLoading(true);
    setError(null);
    console.log(files);
    try {
      const formData = new FormData();
      files.forEach((fileList) => {
        formData.append("purchaseOrderFile", fileList[0]);
      });

      const { status, data } = await extractPurchaseOrder(formData);
      // console.log(status, data);

      if (status !== 200) {
        throw new Error("Purchase Order Submit Failed");
      }

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
export const useGetPurchaseOrderFiles = (poId) => {
  const [files, setFiles] = useState([]);
  const [fileLoading, setFileLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!poId) return;
    const loadFiles = async () => {
      setFileLoading(false);
      const [success, data] = await purchaseOrderFiles(poId);

      if (success) {
        setFiles(data.data);
      } else {
        setError("Unable to process file retrieval");
      }
      setFileLoading(false);
    };
    loadFiles();
  }, [poId]);

  return { files, fileLoading, error };
};
