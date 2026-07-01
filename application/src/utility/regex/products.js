export const productsRegex = (text = "") => {
  if (!text || typeof text !== "string") return [];

  const lines = text
    .split("\n")
    .map((line) => line.trim())
    .filter(Boolean);

  const products = [];

  for (const line of lines) {
    // Matches: "Product Name 10"
    const match = line.match(/^(.+?)\s+(\d+(?:\.\d+)?)$/);

    if (!match) continue;

    const productName = match[1].trim();
    const quantity = Number(match[2]);

    // ignore noise
    if (productName.length < 3) continue;

    products.push({
      productName,
      quantity,
      weight: "",
    });
  }

  return products;
};
