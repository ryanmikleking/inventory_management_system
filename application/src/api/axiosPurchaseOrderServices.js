import api from "./api";

export const getPurchaseOrders = async () => {
  try {
    const response = await api.get("/purchase-orders");

    // Transforms object of objects into an array of objects
    const dataArray = Object.values(response.data);
    return dataArray;
  } catch (error) {
    console.error("Error fetching data:", error);
    return []; // Return empty array on failure
  }
};
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
export const extractPurchaseOrder = async (formData) => {
  try {
    const response = await api.post("/purchase-orders/extract", formData);
    console.log("Data Posted!");
    return response;
  } catch (error) {
    console.error("Error processing pdf input", error);
    return "";
  }
};
