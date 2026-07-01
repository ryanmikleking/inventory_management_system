import { purchaseOrderRegex } from "./regex/purchaseOrder.js";
import { companyRegex } from "./regex/company.js";
import { productsRegex } from "./regex/products.js";
import { extractText } from "../textExtraction/textExtractor.js";

export const parsePurchaseOrder = async (file) => {
  const text = await extractText(file);
  console.log("OCR TEXT:", text.text);
  console.log("TYPE:", typeof text.text);
  console.log("IS STRING:", typeof text.text === "string");
  return {
    purchaseOrder: purchaseOrderRegex(text.text),
    companyName: companyRegex(text.text),
    products: productsRegex(text.text),
  };
};
