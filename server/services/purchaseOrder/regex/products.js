import { distance } from "fastest-levenshtein";

const normalize = (value = "") => {
  return String(value)
    .toLowerCase()
    .replace(/[^a-z0-9]/g, "");
};

const quantityUnitRegex =
  /\b(\d+(?:,\d{3})?(?:\.\d+)?)\s*(EA|EACH|PCS|PC|LB|LBS|KG)\b/i;

const formatQuantity = (value) => {
  let cleaned = String(value).trim();

  if (/^\d+,\d+$/.test(cleaned)) {
    cleaned = cleaned.replace(",", ".");
  }

  const number = Number(cleaned);

  if (Number.isNaN(number)) {
    return cleaned;
  }
  console.log("❤️ Before Format:", number);
  return number.toFixed(2);
};

export const findQuantityUnit = (line) => {
  const match = line.match(quantityUnitRegex);
  console.log("⚠️", match);
  if (!match) {
    return null;
  }

  return {
    quantity: formatQuantity(match[1]),
    unit: match[2].toUpperCase(),
  };
};
const getCandidatePartNumbers = (line) => {
  const tokens = String(line).match(/[A-Z0-9][A-Z0-9\-\/]+/gi) || [];

  return tokens.filter((token) => {
    const normalized = normalize(token);

    if (normalized.length < 5) {
      return false;
    }

    if (/^\d+$/.test(normalized)) {
      return false;
    }

    if (
      /^(EA|EACH|PCS|PC|LB|LBS|KG|FT|IN|MM|CM)$/.test(normalized.toUpperCase())
    ) {
      return false;
    }

    return true;
  });
};

const partNumberDistance = (ocrPart, dbPart) => {
  const a = normalize(ocrPart);
  const b = normalize(dbPart);

  if (!a || !b) {
    return Infinity;
  }

  // Exact normalized match
  if (a === b) {
    return 0;
  }

  // Don't compare wildly different lengths
  if (Math.abs(a.length - b.length) > 3) {
    return Infinity;
  }

  return distance(a, b);
};

// export const findProductInLine = (line, products) => {
//   const quantityUnit = findQuantityUnit(line);

//   if (!quantityUnit) {
//     return null;
//   }

//   const candidates = getCandidatePartNumbers(line);

//   console.log("\n=================================");
//   console.log("OCR PRODUCT LINE:");
//   console.log(line);
//   console.log("CANDIDATE PARTS:", candidates);
//   console.log("=================================");

//   let bestProduct = null;
//   let bestScore = Infinity;

//   for (const product of products) {
//     const incomingDistance = Math.min(
//       ...candidates.map((candidate) =>
//         partNumberDistance(
//           candidate,
//           product.normalized_incoming_product_no || product.incoming_product_no,
//         ),
//       ),
//     );

//     const outgoingDistance = Math.min(
//       ...candidates.map((candidate) =>
//         partNumberDistance(
//           candidate,
//           product.normalized_outgoing_product_no || product.outgoing_product_no,
//         ),
//       ),
//     );

//     const bestPartDistance = Math.min(incomingDistance, outgoingDistance);

//     if (bestPartDistance < bestScore) {
//       bestScore = bestPartDistance;
//       bestProduct = product;
//     }
//   }

//   if (!bestProduct || bestScore > 2) {
//     console.log("❌ No confident product match");
//     return null;
//   }

//   console.log("✅ MATCHED PRODUCT:");
//   console.log(bestProduct);
//   console.log("PART DISTANCE:", bestScore);

//   return {
//     ...bestProduct,

//     quantity: quantityUnit.quantity,
//     unit: quantityUnit.unit,

//     matchDistance: bestScore,
//   };
// };
export const findProductInLine = (line, products, followingLines = []) => {
  // Make absolutely sure line is a string
  if (typeof line !== "string") {
    console.log("⚠️ findProductInLine received non-string:", line);
    return null;
  }

  const quantityUnit = findQuantityUnit(line);

  if (!quantityUnit) {
    return null;
  }

  const candidates = getCandidatePartNumbers(line);

  console.log("\n=================================");
  console.log("OCR PRODUCT LINE:");
  console.log(line);
  console.log("CANDIDATE PARTS:", candidates);
  console.log("=================================");

  let bestProduct = null;
  let bestScore = Infinity;

  for (const product of products) {
    const incomingPart =
      product.normalized_incoming_product_no || product.incoming_product_no;

    const outgoingPart =
      product.normalized_outgoing_product_no || product.outgoing_product_no;

    const distances = [
      ...candidates.map((candidate) =>
        partNumberDistance(candidate, incomingPart),
      ),
      ...candidates.map((candidate) =>
        partNumberDistance(candidate, outgoingPart),
      ),
    ];

    const productDistance =
      distances.length > 0 ? Math.min(...distances) : Infinity;

    if (productDistance < bestScore) {
      bestScore = productDistance;
      bestProduct = product;
    }
  }

  if (!bestProduct || bestScore > 2) {
    console.log("❌ No confident product match");
    return null;
  }

  let componentQuantity = null;
  let componentLine = null;
  let componentDistance = Infinity;

  for (const item of followingLines) {
    const possibleLine = typeof item === "string" ? item : item?.line || "";

    if (!possibleLine) {
      continue;
    }

    const possibleQuantity = findQuantityUnit(possibleLine);

    if (!possibleQuantity) {
      continue;
    }

    const possibleCandidates = getCandidatePartNumbers(possibleLine);

    if (!possibleCandidates.length) {
      continue;
    }

    const incomingDistance = Math.min(
      ...possibleCandidates.map((candidate) =>
        partNumberDistance(
          candidate,
          bestProduct.normalized_incoming_product_no ||
            bestProduct.incoming_product_no,
        ),
      ),
    );

    const outgoingDistance = Math.min(
      ...possibleCandidates.map((candidate) =>
        partNumberDistance(
          candidate,
          bestProduct.normalized_outgoing_product_no ||
            bestProduct.outgoing_product_no,
        ),
      ),
    );

    const possibleDistance = Math.min(incomingDistance, outgoingDistance);

    if (possibleDistance < componentDistance) {
      componentDistance = possibleDistance;
      componentQuantity = possibleQuantity;
      componentLine = possibleLine;
    }

    if (possibleDistance === 0) {
      break;
    }
  }

  let finalQuantity = quantityUnit;

  if (componentQuantity && componentDistance <= 2) {
    finalQuantity = componentQuantity;

    console.log("🔄 USING COMPONENT LINE:");
    console.log(componentLine);

    console.log("🔄 COMPONENT QUANTITY:");
    console.log(componentQuantity);
  }

  console.log("✅ MATCHED PRODUCT:");
  console.log(bestProduct);
  console.log("PART DISTANCE:", bestScore);
  console.log("QUANTITY USED:", finalQuantity);

  return {
    ...bestProduct,

    quantity: finalQuantity.quantity,
    unit: finalQuantity.unit,

    matchDistance: bestScore,
  };
};

export const findProductLines = (text) => {
  const lines = String(text)
    .split(/\r?\n/)
    .map((line) => line.trim())
    .filter(Boolean);

  const productLines = [];

  lines.forEach((line, index) => {
    if (!quantityUnitRegex.test(line)) {
      return;
    }

    productLines.push({
      line,
      followingLines: lines.slice(index + 1, index + 11),
    });
  });

  console.log("========== POSSIBLE PRODUCT LINES ==========");

  console.log("Array Length:", productLines.length);

  productLines.forEach((item, index) => {
    console.log(`${index + 1}: ${item.line}`);

    console.log("   Following lines:", item.followingLines.length);
  });

  console.log("Total possible product lines:", productLines.length);

  return productLines;
};
export const stripBeforeLineItems = (text) => {
  const lines = text.split(/\r?\n/);

  const headerRegex =
    /\bitem\b.*?\bpart\s*#?\b.*?\bdescription\b.*?\bqty\b.*?\bmeasure\b.*?\bprice\b/i;

  const headerIndex = lines.findIndex((line) => headerRegex.test(line));

  console.log("🧨‼️HeaderIndex:", headerIndex);

  if (headerIndex === -1) {
    console.log("⚠️ Line item header not found");
    return text;
  }

  console.log("🧨‼️Line Item Header:", lines[headerIndex]);

  const poLines = lines.slice(headerIndex + 1);
  const totalIndex = poLines.findIndex((line) =>
    /TOTAL NET VALUE EXCL\. TAX/i.test(line),
  );

  if (totalIndex !== -1) {
    console.log("🛑 PO end found at line:", totalIndex);

    return poLines
      .slice(0, totalIndex + 1)
      .join("\n")
      .trim();
  }

  return poLines.join("\n").trim();
};
