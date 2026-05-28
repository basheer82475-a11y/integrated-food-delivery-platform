import express from "express";

import {
  registerUser,
  loginUser,
  logoutUser,
  getMyProfile,
  refreshAccessToken,
} from "../controllers/auth.controller.js";

import { protect } from "../middlewares/auth.middleware.js";

const router = express.Router();

// Public Routes
router.post("/register", registerUser);

router.post("/login", loginUser);

router.post("/refresh-token", refreshAccessToken);

// Protected Routes
router.post("/logout", protect, logoutUser);

router.get("/me", protect, getMyProfile);

export default router;
