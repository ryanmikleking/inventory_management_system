import { purchaseOrderRegex } from "./regex/purchaseOrder.js";
import { findCompanyMatch } from "./regex/company.js";
import { parseProducts } from "./regex/products.js";
import { extractText } from "../textExtraction/textExtractor.js";

export const parsePurchaseOrder = async (file) => {
  console.log("Extracting Text...");
  const text = await extractText(file);
  const companyMatch = findCompanyMatch(text.text, "Hubbell Power Systems Inc");
  const finalName = companyMatch
    .map((obj) => obj.company)
    .join("")
    .replace(/([a-z])([A-Z])/g, "$1 $2")
    .trim();
  const finalNameScore =
    companyMatch.map((obj) => obj.confidence).reduce((a, b) => a + b, 0) /
    companyMatch.length;
  console.log("Company Name: " + finalName);

  return {
    purchaseOrder: purchaseOrderRegex(text.text),
    companyName: { name: finalName, confidence: finalNameScore },
    products: parseProducts(text.text),
  };
};
