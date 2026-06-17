import express from "express";

import {
  getAllUsers,
  getUserById,
  updateUserRole,
  updateUserStatus,
} from "../controllers/user.controller.js";

import { protect, authorize } from "../middlewares/auth.middleware.js";

import { ROLES } from "../constants/roles.js";

const router = express.Router();

// ==============================
// Admin Only Routes
// ==============================

router.use(protect, authorize(ROLES.ADMIN));

// Get All Users

router.get("/", getAllUsers);

// Get User By Id

router.get("/:id", getUserById);

// Change User Role

router.patch("/:id/role", updateUserRole);

// Activate / Deactivate User

router.patch("/:id/status", updateUserStatus);

export default router;
