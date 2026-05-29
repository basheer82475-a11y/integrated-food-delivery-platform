import express from "express";

import {
  createCategory,
  getAllCategories,
  getCategoryById,
  updateCategory,
  deleteCategory,
} from "../controllers/category.controller.js";

import { protect } from "../middlewares/auth.middleware.js";

const router = express.Router();

router.post("/", protect, createCategory);

router.get("/", getAllCategories);

router.get("/:id", getCategoryById);

router.patch("/:id", protect, updateCategory);

router.delete("/:id", protect, deleteCategory);

export default router;
