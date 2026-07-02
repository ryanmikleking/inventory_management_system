const normalizeOCR = (text = "") => {
  return text
    .toUpperCase()
    .replace(/O/g, "0") // OCR fix
    .replace(/I/g, "1") // OCR fix
    .replace(/\s+/g, " ");
};
const scorePartNumber = (part) => {
  if (!part) return 0;

  const p = normalizeOCR(part);

  let score = 0;

  const validShape = /^[A-Z0-9]{6,12}$/;
  const hasLetter = /[A-Z]/.test(p);
  const hasNumber = /\d/.test(p);

  if (!(hasLetter && hasNumber)) return 10;

  score += 40;

  if (validShape.test(p)) score += 30;

  // OCR noise penalty
  const noise = (part.match(/[OI]/g) || []).length;
  score -= noise * 10;

  return Math.max(score, 0);
};
const parseQuantity = (qty) => {
  if (!qty) return null;

  let value = Number(qty.replace(/,/g, ""));

  if (Number.isNaN(value)) return null;

  // OCR fix: 480000 -> 480, 628000 -> 628
  if (value >= 100000) value = value / 1000;
  else if (value >= 10000) value = value / 100;

  return value;
};

const scoreQuantity = (qty) => {
  if (qty == null) return 0;

  let score = 20;

  if (Number.isFinite(qty)) score += 20;

  if (Number.isInteger(qty)) score += 10;

  if (qty > 0) score += 10;

  return Math.min(score, 40);
};

const parseUnit = (unit) => {
  if (!unit) return null;

  return unit.replace(/\./g, "").toUpperCase();
};

const scoreUnit = (unit) => {
  if (!unit) return 0;

  const valid = /^(EA|LB|LBS)$/i.test(unit);

  return valid ? 20 : 10;
};

const extractParts = (text) => {
  const partRegex = /\b(?:[A-Z]{1,4}\d{3,10}[A-Z0-9]*|\d{6,10})\b/g;

  return [...new Set((text.match(partRegex) || []).map(normalizeOCR))];
};

export const parseProducts = (text) => {
  const parts = extractParts(text);

  const quantityMatches = text.match(/\b\d{3,}\b/g) || [];
  const unitMatches = text.match(/\b(EA|LBS?|LB)\b/gi) || [];

  const results = [];

  for (let i = 0; i < parts.length; i++) {
    const part = parts[i];

    const rawQty = quantityMatches[i] || null;
    const rawUnit = unitMatches[i] || null;

    const quantity = parseQuantity(rawQty);
    const unit = parseUnit(rawUnit);

    const partScore = scorePartNumber(part);
    const qtyScore = scoreQuantity(quantity);
    const unitScore = scoreUnit(unit);

    const confidence = Math.round(
      partScore * 0.5 + qtyScore * 0.3 + unitScore * 0.2,
    );
    if (confidence > 30) {
      results.push({
        partNumber: {
          value: part,
          confidence: partScore,
        },
        quantity: {
          value: quantity,
          confidence: qtyScore,
        },
        unit: {
          value: unit,
          confidence: unitScore,
        },
        confidence,
      });
    }
  }

  return results;
};
