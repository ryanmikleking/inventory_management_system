export const productsRegex = (text) => {
  const lines = text
    .split("\n")
    .map((line) => line.trim())
    .filter(Boolean);

  const products = [];

  for (const line of lines) {
    // Match: Product Name    Quantity
    // Examples:
    // Steel Rod 10
    // Aluminum Plate 4
    // Copper Pipe 25

    const match = line.match(/^(.+?)\s+(\d+(?:\.\d+)?)$/);

    if (!match) continue;

    const productName = match[1].trim();
    const quantity = Number(match[2]);

    // Ignore very short matches
    if (productName.length < 3) continue;

    products.push({
      productName,
      quantity,
      weight: "",
    });
  }

  return products;
};
