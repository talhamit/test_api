import Product from "../models/Product.js";

export const addProduct = async (req, res) => {
  res.json(await Product.create(req.body));
};

export const getProducts = async (_, res) => {
  res.json(await Product.find());
};

export const updateProduct = async (req, res) => {
  res.json(await Product.findByIdAndUpdate(req.params.id, req.body, { new: true }));
};

export const deleteProduct = async (req, res) => {
  await Product.findByIdAndDelete(req.params.id);
  res.json({ message: "Product deleted" });
};
