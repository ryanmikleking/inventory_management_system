import api from "./api";

export const extractPurchaseOrder = async (formData) => {
  const response = await api.post("/purchase-orders/extract", formData);

  return response;
};
