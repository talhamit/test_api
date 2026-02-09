import express from "express";
import { createBlog, getBlogs } from "../controllers/blogController.js";
import { auth } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/", auth, createBlog);
router.get("/", getBlogs);

export default router;
