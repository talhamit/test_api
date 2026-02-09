import Blog from "../models/Blog.js";

export const createBlog = async (req, res) => {
  res.json(await Blog.create(req.body));
};

export const getBlogs = async (_, res) => {
  res.json(await Blog.find());
};
