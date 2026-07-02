import fuzzysort from "fuzzysort";

const normalizeText = (text = "") => {
  return text
    .replace(/\s+/g, " ") // collapse whitespace/newlines
    .replace(/[^\w\s.&,-]/g, "") // remove OCR noise
    .toLowerCase()
    .trim();
};

const normalizeCompany = (name = "") => {
  return name
    .replace(/\./g, "") // Inc. → Inc
    .replace(/[^\w\s]/g, "") // remove punctuation
    .replace(/\s+/g, " ")
    .toLowerCase()
    .trim();
};

const buildLooseRegex = (companyName) => {
  const tokens = normalizeCompany(companyName).split(" ").filter(Boolean);

  // allow optional punctuation and flexible spacing
  const pattern = tokens.map((t) => `${t}\\s*`).join("");

  return new RegExp(pattern, "i");
};
const tokenMatch = (text, companyName) => {
  const normText = normalizeText(text);
  const tokens = normalizeCompany(companyName).split(" ");

  return tokens.every((token) => normText.includes(token));
};

const regexMatch = (text, companyName) => {
  const regex = buildLooseRegex(companyName);
  return regex.test(normalizeText(text));
};

const fuzzyMatch = (text, companyName, threshold = -1000) => {
  const result = fuzzysort.single(
    normalizeCompany(companyName),
    normalizeText(text),
  );

  return result ? result.score > threshold : false;
};

export const findCompanyMatch = (text, companyList = []) => {
  const results = [];

  for (const company of companyList) {
    const normalizedText = normalizeText(text);

    const token = tokenMatch(normalizedText, company);
    const regex = regexMatch(normalizedText, company);
    const fuzzy = fuzzyMatch(normalizedText, company);

    let confidence = 0;

    if (token) confidence += 50;
    if (regex) confidence += 30;
    if (fuzzy) confidence += 20;

    if (confidence > 0) {
      results.push({
        company,
        matched: true,
        confidence,
        methods: {
          token,
          regex,
          fuzzy,
        },
      });
    }
  }

  // sort best matches first
  return results.sort((a, b) => b.confidence - a.confidence);
};

/**
 * Optional: single-company quick check
 */
const isCompanyInText = (text, company) => {
  return tokenMatch(text, company) || regexMatch(text, company);
};

// module.exports = {
//   normalizeText,
//   normalizeCompany,
//   buildLooseRegex,
//   tokenMatch,
//   regexMatch,
//   fuzzyMatch,
//   findCompanyMatch,
//   isCompanyInText,
// };
