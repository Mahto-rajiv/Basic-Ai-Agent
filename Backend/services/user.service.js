import User from "../models/user.model.js";

export const createUser = async ({ email, password }) => {
  if (!email || !password) {
    throw new Error("Email and Password are required.");
  }
  const user = await User.create({
    email,
    password,
  });

  return user;
};
