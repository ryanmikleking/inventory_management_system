export const purchaseOrderRegex = (text) => {
  const patterns = [
    {
      regex: /purchase\s*order\s*[:#-]?\s*(\d{6,20})/i,
      confidence: 100,
    },
    {
      regex: /purchase\s*order\s*(?:no\.?|number)?\s*[:#-]?\s*(\d{6,20})/i,
      confidence: 95,
    },
    {
      regex: /\bpo\b\s*[:#-]?\s*(\d{6,20})/i,
      confidence: 90,
    },
    {
      regex: /\b(\d{8,20})\b/,
      confidence: 50,
    },
  ];

  for (const { regex, confidence } of patterns) {
    const match = text.match(regex);
    if (match) {
      return {
        purchaseOrder: match[1],
        confidence,
      };
    }
  }

  return "";
};
