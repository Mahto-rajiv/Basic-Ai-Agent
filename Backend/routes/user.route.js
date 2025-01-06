import { Router } from "express";
import {
  createUserController,
  loginController,
  profileController,
} from "../controllers/user.controller.js";
import { body } from "express-validator";
import { authUser } from "../middleware/auth.middleware.js";

const router = Router();

router.post(
  "/register",
  body("email").isEmail().withMessage("Email must be a valid email address"),
  body("password")
    .isLength({ min: 3 })
    .withMessage("Password must be at least 3 characters long."),
  createUserController
);

router.post(
  "/login",
  body("email").isEmail().withMessage("Email must be a valid email address"),
  body("password")
    .isLength({ min: 3 })
    .withMessage("Password must be at least 3 characters long."),
  loginController
);

router.get("/profile", authUser, profileController);

export default router;
