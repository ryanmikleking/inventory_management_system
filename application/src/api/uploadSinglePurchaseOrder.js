import api from "./api";

export const getSinglePurchaseOrder = async (id) => {
  try {
    const response = await api.get(`/purchase-orders/${id}`);
    const dataArray = Object.values(response.data);
    return dataArray;
  } catch (error) {
    console.error("Error fetching data:", error);
    return "";
  }
};
