// Professional REST API with JWT Authentication
// Node.js + Express + MongoDB (Mongoose)
// Includes: Login + Access Token, Users, Products, Orders, BlogPosts, Large Dataset

import express from 'express';
import mongoose from 'mongoose';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import cors from 'cors';

const app = express();
app.use(express.json());
app.use(cors());

// ------------------ CONFIG ------------------
const JWT_SECRET = "SUPER_SECRET_KEY_CHANGE_ME";
const MONGO_URL = "YOUR_MONGO_URI"; // Replace when deploying

mongoose.connect(MONGO_URL).then(() => console.log("Mongo Connected"));

// ------------------ MODELS ------------------

const userSchema = new mongoose.Schema({
  name: String,
  email: { type: String, unique: true },
  password: String,
  role: { type: String, default: "user" }
});

const productSchema = new mongoose.Schema({
  name: String,
  price: Number,
  stock: Number,
});

const orderSchema = new mongoose.Schema({
  userId: String,
  products: Array,
  total: Number,
  status: { type: String, default: "pending" }
});

const blogSchema = new mongoose.Schema({
  title: String,
  content: String,
  author: String,
});

const User = mongoose.model("User", userSchema);
const Product = mongoose.model("Product", productSchema);
const Order = mongoose.model("Order", orderSchema);
const Blog = mongoose.model("Blog", blogSchema);

// ------------------ AUTH MIDDLEWARE ------------------

function auth(req, res, next) {
  const token = req.headers["authorization"]?.split(" ")[1];
  if (!token) return res.status(401).json({ message: "Access token required" });
  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    req.user = decoded;
    next();
  } catch (err) {
    return res.status(401).json({ message: "Invalid token" });
  }
}

// ------------------ AUTH ROUTES ------------------

app.post("/auth/register", async (req, res) => {
  const { name, email, password } = req.body;

  const hashed = await bcrypt.hash(password, 10);
  try {
    const newUser = await User.create({ name, email, password: hashed });
    res.json({ message: "Registered", user: newUser });
  } catch (e) {
    res.status(400).json({ message: "Email already exists" });
  }
});

app.post("/auth/login", async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (!user) return res.status(404).json({ message: "User not found" });

  const valid = await bcrypt.compare(password, user.password);
  if (!valid) return res.status(401).json({ message: "Wrong password" });

  const token = jwt.sign({ id: user._id, email: user.email }, JWT_SECRET);
  res.json({ accessToken: token, user });
});

// ------------------ USERS CRUD ------------------
app.get("/users", auth, async (req, res) => {
  res.json(await User.find());
});

app.delete("/users/:id", auth, async (req, res) => {
  await User.findByIdAndDelete(req.params.id);
  res.json({ message: "User deleted" });
});

// ------------------ PRODUCTS CRUD ------------------
app.post("/products", auth, async (req, res) => {
  res.json(await Product.create(req.body));
});

app.get("/products", async (req, res) => {
  res.json(await Product.find());
});

app.put("/products/:id", auth, async (req, res) => {
  res.json(await Product.findByIdAndUpdate(req.params.id, req.body, { new: true }));
});

app.delete("/products/:id", auth, async (req, res) => {
  await Product.findByIdAndDelete(req.params.id);
  res.json({ message: "Product deleted" });
});

// ------------------ ORDERS CRUD ------------------
app.post("/orders", auth, async (req, res) => {
  res.json(await Order.create(req.body));
});

app.get("/orders", auth, async (req, res) => {
  res.json(await Order.find());
});

app.put("/orders/:id", auth, async (req, res) => {
  res.json(await Order.findByIdAndUpdate(req.params.id, req.body, { new: true }));
});

app.delete("/orders/:id", auth, async (req, res) => {
  await Order.findByIdAndDelete(req.params.id);
  res.json({ message: "Order deleted" });
});

// ------------------ BLOG CRUD ------------------
app.post("/blogs", auth, async (req, res) => {
  res.json(await Blog.create(req.body));
});

app.get("/blogs", async (req, res) => {
  res.json(await Blog.find());
});

// ------------------ RANDOM LARGE DATASET ------------------
app.get("/generate-large", async (req, res) => {
  const list = [];
  for (let i = 0; i < 20000; i++) {
    list.push({
      id: i,
      name: `Item-${i}`,
      price: Math.floor(Math.random() * 1000)
    });
  }
  res.json(list);
});

// ------------------ SERVER ------------------
//app.listen(5000, () => console.log("API running on port 5000"));
const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`API running on port ${port}`));