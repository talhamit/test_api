import dotenv from "dotenv";
import express from "express";
import cors from "cors";
import connectDB from "./config/db.js";

import authRoutes from "./routes/authRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import productRoutes from "./routes/productRoutes.js";
import orderRoutes from "./routes/orderRoutes.js";
import blogRoutes from "./routes/blogRoutes.js";

import { generateLargeData } from "./utils/generateLargeData.js";

dotenv.config();
connectDB();

const app = express();
app.use(cors());
app.use(express.json());

// Routes
app.use("/auth", authRoutes);
app.use("/users", userRoutes);
app.use("/products", productRoutes);
app.use("/orders", orderRoutes);
app.use("/blogs", blogRoutes);

// Large dataset
app.get("/generate-large", (_, res) => {
  res.json(generateLargeData());
});

app.get("/", (_, res) => res.send("API is running..."));

const PORT = process.env.PORT || 10000;

app.listen(PORT, () => console.log(`🚀 Server live on port ${PORT}`));
