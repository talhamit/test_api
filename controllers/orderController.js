import Order from "../models/Order.js";

export const addOrder = async (req, res) => {
  res.json(await Order.create(req.body));
};

export const getOrders = async (_, res) => {
  res.json(await Order.find());
};

export const updateOrder = async (req, res) => {
  res.json(await Order.findByIdAndUpdate(req.params.id, req.body, { new: true }));
};

export const deleteOrder = async (req, res) => {
  await Order.findByIdAndDelete(req.params.id);
  res.json({ message: "Order deleted" });
};
