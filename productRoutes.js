import express from "express";
import { addProduct, getProducts, updateProduct, deleteProduct } from "../controllers/productController.js";
import { auth } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/", auth, addProduct);
router.get("/", getProducts);
router.put("/:id", auth, updateProduct);
router.delete("/:id", auth, deleteProduct);

export default router;
