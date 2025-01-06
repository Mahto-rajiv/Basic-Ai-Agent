import User from "../models/user.model.js";
import { createUser } from "../services/user.service.js";
import { validationResult } from "express-validator";
import { generateAuthToken } from "../services/auth.service.js";

export const createUserController = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  try {
    const user = await createUser(req.body);
    return res.status(201).send(user);
  } catch (error) {
    return res.status(400).send(error.message);
  }
};

export const loginController = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      throw new Error("Email and Password are required.");
    }
    const user = await User.findOne({ email }).select("+password");
    if (!user) {
      return res.status(404).json({ message: "User not found." });
    }
    const isMatch = await user.isValidPassword(password);

    if (!isMatch) {
      return res.status(401).json({ error: "Invalid credentials" });
    }
    const token = generateAuthToken(user);

    res.cookie("token", token);

    return res.status(201).json({ user: user, token: token });
  } catch (error) {
    console.log("Error");
    return res.status(500).json({ error: error.message });
  }
};

export const profileController = async (req, res) => {
  console.log(req.user);
  return res.status(201).json({ user: req.user });
};
