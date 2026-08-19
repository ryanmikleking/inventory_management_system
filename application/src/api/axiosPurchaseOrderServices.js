import api from "./api";

export const getPurchaseOrders = async ({
  page = 1,
  limit = 20,
  search = "",
} = {}) => {
  try {
    const response = await api.get("/purchase-orders", {
      params: {
        page,
        limit,
        search,
      },
    });
    console.log("RAW API RESPONSE:", response.data);
    console.log("PURCHASE ORDERS:", response.data.purchase_orders);
    console.log(
      "PURCHASE ORDERS LENGTH:",
      response.data.purchase_orders?.length,
    );
    return [true, response.data];
  } catch (error) {
    console.error("Error fetching purchase orders:", error);

    return [
      false,
      {
        purchase_orders: [],
        pagination: {
          page,
          limit,
          totalItems: 0,
          totalPages: 0,
          hasNextPage: false,
          hasPreviousPage: false,
        },
        error: error.response?.data?.error || "Failed to fetch purchase orders",
      },
    ];
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
    console.log(response);
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
    if (response) return response;
    else return "Purchase Order Failed!";
  } catch (error) {
    console.error("Error processing purchase order submission", error);
  }
};
export const updatePurchaseOrderImages = async (data) => {
  try {
    const response = await api.post("/file", data);
    return response;
  } catch (error) {
    console.error("Error processing update images", error);
  }
};

export const purchaseOrderFiles = async (data) => {
  try {
    const response = await api.get(`/file/${data}`);

    return [true, response];
  } catch (error) {
    console.error("Error processing image retrieval...", error);
  }
};
