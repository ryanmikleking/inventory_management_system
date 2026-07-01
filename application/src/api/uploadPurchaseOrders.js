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
