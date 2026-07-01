import { companyRegex } from "./regex/company";
import { productsRegex } from "./regex/products";
import { purchaseOrderRegex } from "./regex/purchaseOrder";
export const regexHandler = async (text) => {
  const companyName = await companyRegex(text);
  const purchaseOrder = await purchaseOrderRegex(text);
  const products = await productsRegex(text);

  return (companyName, purchaseOrder, products);
};
