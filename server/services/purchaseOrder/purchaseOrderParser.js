import { purchaseOrderRegex } from "./regex/purchaseOrder.js";
import { findCompanyMatch } from "./regex/company.js";
import {
  findProductLines,
  findPartInLine,
  findQuantity,
} from "./regex/products.js";
import { extractText } from "../textExtraction/textExtractor.js";

export const parsePurchaseOrder = async (files) => {
  const textResults = await Promise.all(files.map((file) => extractText(file)));
  // Combine text from all files
  const combinedText = textResults.map((result) => result.text).join("\n");

  const companyMatch = findCompanyMatch(
    combinedText,
    "Hubbell Power Systems Inc",
  );
  console.log(companyMatch);
  const finalName = companyMatch
    .map((obj) => obj.company)
    .join("")
    .replace(/([a-z])([A-Z])/g, "$1 $2")
    .trim();
  console.log(finalName);
  const parts = [
    "P1100672",
    "P1100036",
    "451303",
    "PS451303X",
    "PSC1500160X1",
    "PSC1500160X",
  ];
  //console.log(parseProducts(combinedText, parts));
  const arrOfProds = [];
  const arrOfValues = [];
  try {
    const lines = findProductLines(combinedText);

    lines.forEach((element) => {
      const i = findPartInLine(element, parts);
      const quantity = findQuantity(element);
      arrOfProds.push({ partNo: i, quantity: quantity });
    });
  } catch (e) {
    console.error("PRODUCT PARSER FAILED:", e);
  }

  // console.log(lines instanceof Array);
  // console.log(Array.from(lines));
  return {
    purchaseOrder: purchaseOrderRegex(combinedText),
    companyName: finalName,
    products: arrOfProds,
  };
};
