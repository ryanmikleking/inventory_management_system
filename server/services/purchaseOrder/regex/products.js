import { distance } from "fastest-levenshtein";

const normalize = (value = "") => {
  return String(value)
    .toUpperCase()
    .replace(/[^A-Z0-9]/g, "");
};

const quantityUnitRegex =
  /\b(\d+(?:,\d{3})?(?:\.\d+)?)\s*(EA|EACH|PCS|PC|LB|LBS|FT|IN|YD|RL|BOX|BX|PK|SET|KG|M|MM|CM)\b/i;

const findPart = (line, parts) => {
  const normalizedLine = normalize(line);

  for (const dbPart of parts) {
    const normalizedDBPart = normalize(dbPart);

    if (normalizedDBPart && normalizedLine.includes(normalizedDBPart)) {
      return {
        original: dbPart,
        distance: 0,
      };
    }
  }

  const words = line.match(/[A-Z0-9\-\/]+/gi) || [];

  let bestPart = null;
  let bestDistance = Infinity;

  for (const word of words) {
    const normalizedWord = normalize(word);

    if (!normalizedWord) continue;

    for (const dbPart of parts) {
      const normalizedDBPart = normalize(dbPart);

      if (Math.abs(normalizedWord.length - normalizedDBPart.length) > 2) {
        continue;
      }

      const d = distance(normalizedWord, normalizedDBPart);

      if (d < bestDistance) {
        bestDistance = d;

        bestPart = dbPart;
      }
    }
  }

  if (bestPart && bestDistance <= 1) {
    return {
      original: bestPart,
      distance: bestDistance,
    };
  }

  return null;
};

export const parseProducts = (text, parts) => {
  const lines = String(text)
    .split(/\r?\n/)
    .map((line) => line.trim())
    .filter(Boolean);

  const results = [];

  for (const line of lines) {
    const quantityUnit = line.match(quantityUnitRegex);

    if (!quantityUnit) {
      continue;
    }

    const quantity = quantityUnit[1].replace(/,/g, "");

    const unit = quantityUnit[2].toUpperCase();

    const matchedPart = findPart(line, parts);

    if (!matchedPart) {
      continue;
    }

    const normalizedDBPart = normalize(matchedPart.original);

    let cleanedLine = line;

    const partRegex = new RegExp(
      matchedPart.original
        .split("")
        .map((char) => char.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"))
        .join("[\\s\\-\\/]*"),
      "i",
    );

    if (partRegex.test(cleanedLine)) {
      cleanedLine = cleanedLine.replace(partRegex, matchedPart.original);
    } else {
      const words = cleanedLine.split(/\s+/);

      const index = words.findIndex((word) => {
        const d = distance(normalize(word), normalizedDBPart);

        return d <= 1;
      });

      if (index !== -1) {
        words[index] = matchedPart.original;

        cleanedLine = words.join(" ");
      }
    }

    const canonicalIndex = cleanedLine
      .toUpperCase()
      .indexOf(matchedPart.original.toUpperCase());

    const descriptionStart = canonicalIndex + matchedPart.original.length;

    const quantityIndex = cleanedLine.search(
      /\b\d+(?:,\d{3})?(?:\.\d+)?\s*(EA|EACH|PCS|PC|LB|LBS|FT|IN|YD|RL|BOX|BX|PK|SET|KG|M|MM|CM)\b/i,
    );

    let description = cleanedLine
      .substring(descriptionStart, quantityIndex)
      .trim();

    description = description
      .replace(/^[\s\-:|]+/, "")
      .replace(/[\s\-:|]+$/, "");

    results.push({
      partNumber: matchedPart.original,

      description,

      quantity: Number(quantity),

      unit,

      sourceLine: cleanedLine,
    });
  }

  return results;
};

export const findProductLines = (text) => {
  const lines = String(text)
    .split(/\r?\n/)
    .map((line) => line.trim())
    .filter(Boolean);

  // Quantity + unit at the end of the line
  const quantityUnitRegex =
    /\b\d+(?:,\d{3})?(?:\.\d+)?\s*(EA|EACH|PCS|PC|LB|LBS|FT|IN|YD|RL|BOX|BX|PK|SET|KG|M|MM|CM)\b/i;

  const productLines = lines.filter((line) => {
    return quantityUnitRegex.test(line);
  });

  console.log("========== POSSIBLE PRODUCT LINES ==========");

  productLines.forEach((line, index) => {
    console.log(`${index + 1}: ${line}`);
  });

  console.log("Total possible product lines:", productLines.length);

  return productLines;
};

export const findPartInLine = (line, parts) => {
  const tokens = line.split(/\s+/).filter(Boolean);

  let bestMatch = null;
  let bestDistance = Infinity;

  for (const token of tokens) {
    console.log("TOKEN", token);
    const normalizedToken = normalize(token);

    if (normalizedToken.length < 5) {
      continue;
    }

    for (const part of parts) {
      const normalizedPart = normalize(part);

      if (Math.abs(normalizedToken.length - normalizedPart.length) > 3) {
        continue;
      }

      const d = distance(normalizedToken, normalizedPart);

      if (d <= 3) {
        console.log(`${normalizedToken} <-> ${normalizedPart} = ${d}`);
      }

      if (d < bestDistance) {
        bestDistance = d;
        bestMatch = part;
      }
    }
  }

  return {
    partNumber: bestMatch,
    distance: bestDistance,
  };
};
export const findQuantity = (line) => {
  const match = line.match(/(\d+(?:\.\d+)?)\s*EA\b/i);

  // NEVER return null
  if (!match) {
    console.log("NO QUANTITY FOUND:", line);
    return "";
  }

  const rawQuantity = match[1];

  // Already has decimal
  if (rawQuantity.includes(".")) {
    return rawQuantity;
  }

  // Add decimal three places from right
  if (rawQuantity.length > 3) {
    return rawQuantity.slice(0, -3) + "." + rawQuantity.slice(-3);
  }

  return rawQuantity;
};
