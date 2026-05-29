import express from "express";

import {
  createMenu,
  getAllMenus,
  getMenuById,
  updateMenu,
  deleteMenu,
} from "../controllers/menu.controller.js";

import { createMenuValidator } from "../validators/menu.validator.js";

import validate from "../middlewares/validation.middleware.js";

import { protect } from "../middlewares/auth.middleware.js";
const router = express.Router();

router.post("/", protect, createMenuValidator, validate, createMenu);

router.get("/", getAllMenus);

router.get("/:id", getMenuById);

router.patch("/:id", protect, updateMenu);
router.delete("/:id", protect, deleteMenu);

export default router;
