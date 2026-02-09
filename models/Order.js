import mongoose from "mongoose";

const orderSchema = new mongoose.Schema({
  userId: String,
  products: Array,
  total: Number,
  status: { type: String, default: "pending" }
});

export default mongoose.model("Order", orderSchema);
