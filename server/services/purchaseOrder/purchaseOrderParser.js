import { purchaseOrderRegex } from "./regex/purchaseOrder.js";
import { findCompanyMatch } from "./regex/company.js";
import {
  findProductLines,
  findPartInLine,
  findQuantity,
  findPartFromOrder,
} from "./regex/products.js";
import { getProductNumbers } from "./productsQuery.js";
import { extractText } from "../textExtraction/textExtractor.js";
import { text } from "express";

export const parsePurchaseOrder = async (files) => {
  const textResults = await Promise.all(files.map((file) => extractText(file)));
  // Combine text from all files
  const combinedText = textResults.map((result) => result.text).join("\n");
  console.log("PurchaseOrderParser:", textResults);

  const companyMatch = findCompanyMatch(
    combinedText,
    "Hubbell Power Systems Inc",
  );

  const finalName = companyMatch
    .map((obj) => obj.company)
    .join("")
    .replace(/([a-z])([A-Z])/g, "$1 $2")
    .trim();

  const parts = (await getProductNumbers()).map(
    (product) => product.product_number,
  );
  //console.log(parseProducts(combinedText, parts));
  const arrOfProds = [];
  const arrOfValues = [];
  try {
    const lines = findProductLines(combinedText);
    const testArr = [];
    for (const line of lines) {
      const x = findPartFromOrder(line);
      testArr.push(x);
    }

    lines.forEach((element) => {
      const part = findPartFromOrder(element);
      const i = findPartInLine(part, parts);

      const quantity = findQuantity(element);
      arrOfProds.push({ partNo: i, quantity: quantity });
    });
  } catch (e) {
    console.error("PRODUCT PARSER FAILED:", e);
  }
  console.log("This is the array:", arrOfProds);
  // console.log(lines instanceof Array);
  // console.log(Array.from(lines));
  return {
    purchaseOrder: purchaseOrderRegex(combinedText),
    companyName: finalName,
    products: arrOfProds,
  };
};
