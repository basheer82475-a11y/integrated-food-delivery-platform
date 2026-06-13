import express from "express";

import {
  createMenu,
  getAllMenus,
  getMenuById,
  updateMenu,
  deleteMenu,
} from "../controllers/menu.controller.js";

import {
  createMenuValidator,
  updateMenuValidator,
} from "../validators/menu.validator.js";

import validate from "../middlewares/validation.middleware.js";

import { checkMenuOwnership } from "../middlewares/ownership.middleware.js";

import { protect, authorize } from "../middlewares/auth.middleware.js";

import { ROLES } from "../constants/roles.js";

const router = express.Router();

// Create Menu

router.post(
  "/",

  protect,

  authorize(ROLES.ADMIN, ROLES.RESTAURANT_OWNER),

  createMenuValidator,

  validate,

  createMenu,
);

// Get All Menus

router.get("/", getAllMenus);

// Get Menu By Id

router.get("/:id", getMenuById);

// Update Menu

router.patch(
  "/:id",

  protect,

  authorize(ROLES.ADMIN, ROLES.RESTAURANT_OWNER),

  checkMenuOwnership,

  updateMenuValidator,

  validate,

  updateMenu,
);

// Delete Menu
router.delete(
  "/:id",

  protect,

  authorize(ROLES.ADMIN, ROLES.RESTAURANT_OWNER),
  checkMenuOwnership,

  deleteMenu,
);
export default router;
