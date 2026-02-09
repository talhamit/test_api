import express from "express";
import { getUsers, deleteUser } from "../controllers/userController.js";
import { auth } from "../middleware/authMiddleware.js";

const router = express.Router();

router.get("/", auth, getUsers);
router.delete("/:id", auth, deleteUser);

export default router;
