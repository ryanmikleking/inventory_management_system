export const updatePurchaseOrderProduct = async (client, product, poId) => {
  const query = `
    UPDATE purchase_order_products
    SET
      product_name = $1,
      quantity = $2,
      measurement = $3
    WHERE product_id = $4
      AND po_id = $5
    RETURNING *;
  `;

  const values = [
    product.product_name,
    product.quantity,
    product.measurement,
    product.product_id,
    poId,
  ];

  const { rows } = await client.query(query, values);

  return rows[0];
};
