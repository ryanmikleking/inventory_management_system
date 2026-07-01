export const purchaseOrderRegex = (text = "") => {
  if (!text || typeof text !== "string") return "";

  const patterns = [
    /purchase\s*order\s*(?:number|no\.?|#)?[:\s]+([A-Z0-9-]+)/i,
    /\bPO\s*(?:number|no\.?|#)?[:\s]+([A-Z0-9-]+)/i,
    /\border\s*#[:\s]+([A-Z0-9-]+)/i,
  ];

  for (const regex of patterns) {
    const match = text.match(regex);
    if (match?.[1]) {
      return match[1].trim();
    }
  }

  return "";
};
