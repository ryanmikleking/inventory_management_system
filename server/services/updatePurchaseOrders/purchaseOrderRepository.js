export const updatePurchaseOrder = async (client, poId, data) => {
  const { purchase_order_number, internal_po_number, quality_check } = data;

  const query = `
    UPDATE purchase_orders
    SET
      purchase_order_number = $1,
      internal_po_number = $2,
      quality_check = $3
    WHERE po_id = $4
    RETURNING *;
  `;

  const values = [
    purchase_order_number,
    internal_po_number,
    quality_check,
    poId,
  ];

  const { rows } = await client.query(query, values);

  return rows[0];
};
