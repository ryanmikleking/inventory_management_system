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
    return { status: response.status, data: response.data };
  } catch (error) {
    console.error("Error processing pdf input", error);
    return "";
  }
};
export const createPurchaseOrder = async (data) => {
  // const formData = new FormData();
  // formData.append("po-data", data);
  try {
    const response = await api.post("/purchase-orders", data);
    console.log(response);
    if (response) return response;
    else return "Purchase Order Failed!";
  } catch (error) {
    console.error("Error processing purchase order submission", error);
  }
};
export const updatePurchaseOrderImages = async (data) => {
  try {
    const response = await api.post("/file-upload", data);
    return response;
  } catch (error) {
    console.error("Error processing update images", error);
  }
};
