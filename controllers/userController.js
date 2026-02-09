import User from "../models/User.js";

export const getUsers = async (_, res) => {
  res.json(await User.find());
};

export const deleteUser = async (req, res) => {
  await User.findByIdAndDelete(req.params.id);
  res.json({ message: "User deleted" });
};
