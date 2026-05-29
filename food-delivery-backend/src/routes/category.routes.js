import express from "express";

import {
  createCategory,
  getAllCategories,
  getCategoryById,
  updateCategory,
  deleteCategory,
} from "../controllers/category.controller.js";

import { protect, authorize } from "../middlewares/auth.middleware.js";

import { ROLES } from "../constants/roles.js";

import {
  createCategoryValidator,
  updateCategoryValidator,
} from "../validators/category.validator.js";

import validate from "../middlewares/validation.middleware.js";

const router = express.Router();

// Create Category

router.post(
  "/",

  protect,

  authorize(ROLES.ADMIN, ROLES.RESTAURANT_OWNER),

  createCategoryValidator,

  validate,

  createCategory,
);

// Get All Categories

router.get("/", getAllCategories);

// Get Category By Id

router.get("/:id", getCategoryById);

// Update Category

router.patch(
  "/:id",

  protect,

  authorize(ROLES.ADMIN, ROLES.RESTAURANT_OWNER),

  updateCategoryValidator,

  validate,

  updateCategory,
);

// Delete Category

router.delete(
  "/:id",

  protect,

  authorize(ROLES.ADMIN, ROLES.RESTAURANT_OWNER),

  deleteCategory,
);

export default router;
