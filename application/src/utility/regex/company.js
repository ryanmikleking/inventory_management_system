export const companyRegex = (text = "") => {
  if (!text || typeof text !== "string") return "";

  const patterns = [
    /vendor[:\s]+(.+)/i,
    /supplier[:\s]+(.+)/i,
    /bill\s*from[:\s]+(.+)/i,
    /sold\s*by[:\s]+(.+)/i,
  ];

  for (const regex of patterns) {
    const match = text.match(regex);

    if (match?.[1]) {
      return match[1].split("\n")[0].trim();
    }
  }

  // fallback: first meaningful line
  const firstLine = text.split("\n").find((line) => line.trim().length > 3);

  return firstLine?.trim() || "";
};
