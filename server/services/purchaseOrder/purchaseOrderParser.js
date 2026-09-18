import { purchaseOrderRegex } from "./regex/purchaseOrder.js";
import { findCompanyMatch } from "./regex/company.js";
import {
  findProductLines,
  findProductInLine,
  findQuantityUnit,
  stripBeforeLineItems,
} from "./regex/products.js";
import { getProductNumbers } from "./productsQuery.js";
import { extractText } from "../textExtraction/textExtractor.js";

export const parsePurchaseOrder = async (files) => {
  const textResults = await Promise.all(files.map((file) => extractText(file)));

  const combinedText = textResults.map((result) => result.text).join("\n");

  const companyMatch = findCompanyMatch(
    combinedText,
    "Hubbell Power Systems Inc",
  );

  const finalName = companyMatch
    .map((obj) => obj.company)
    .join("")
    .replace(/([a-z])([A-Z])/g, "$1 $2")
    .trim();

  const productData = await getProductNumbers();

  console.log("Product Query:", productData);
  console.log("😎😎😎😎", combinedText);
  const cleanedText = stripBeforeLineItems(combinedText);

  const productMap = new Map();

  try {
    const lines = findProductLines(cleanedText);

    for (const item of lines) {
      const line = item.line;
      const followingLines = item.followingLines || [];

      const product = findProductInLine(line, productData, followingLines);
      console.log("🗄️🗄️🗄️🗄️:", product);
      if (!product) {
        console.log("❌ No product match:", line);
        continue;
      }

      const productId = String(product.product_id);

      if (productMap.has(productId)) {
        console.log(
          `⚠️ Duplicate OCR line ignored for product_id ${productId}`,
        );
        continue;
      }

      productMap.set(productId, {
        product_id: product.product_id,
        quality: product.matchDistance,
        incoming_product_no: product.incoming_product_no,
        outgoing_product_no: product.outgoing_product_no,

        description: product.description,

        quantity: product.quantity,
        unit: product.unit,

        sourceLine: line,
      });
    }
  } catch (e) {
    console.error("PRODUCT PARSER FAILED:", e);
  }

  const arrOfProds = Array.from(productMap.values());

  return {
    purchaseOrder: purchaseOrderRegex(combinedText),
    companyName: finalName,
    products: arrOfProds,
  };
};
