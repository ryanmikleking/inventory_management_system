export async function getPurchaseOrders(req, res, next) {
  try {
    const data = await service();

    res.json({ success: true, data });
  } catch (err) {
    next(err);
  }
}
