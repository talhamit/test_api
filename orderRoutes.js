import express from "express";
import { addOrder, getOrders, updateOrder, deleteOrder } from "../controllers/orderController.js";
import { auth } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/", auth, addOrder);
router.get("/", auth, getOrders);
router.put("/:id", auth, updateOrder);
router.delete("/:id", auth, deleteOrder);

export default router;
