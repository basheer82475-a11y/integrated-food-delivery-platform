import express from "express";

import {
  addToCart,
  getCart,
  removeCartItem,
  clearCart,
  checkoutCart,
} from "../controllers/cart.controller.js";

import {
  addToCartValidator,
  removeCartItemValidator,
  checkoutValidator,
} from "../validators/cart.validator.js";

import validate from "../middlewares/validation.middleware.js";

import { protect, authorize } from "../middlewares/auth.middleware.js";

import { ROLES } from "../constants/roles.js";

const router = express.Router();

router.post(
  "/add",

  protect,

  authorize(ROLES.CUSTOMER),

  addToCartValidator,

  validate,

  addToCart,
);

router.get(
  "/",

  protect,

  authorize(ROLES.CUSTOMER),

  getCart,
);

router.delete(
  "/item/:menuId",

  protect,

  authorize(ROLES.CUSTOMER),

  removeCartItemValidator,

  validate,

  removeCartItem,
);

router.delete(
  "/clear",

  protect,

  authorize(ROLES.CUSTOMER),

  clearCart,
);
router.post(
  "/checkout",

  protect,

  authorize(ROLES.CUSTOMER),

  checkoutValidator,

  validate,

  checkoutCart,
);
export default router;
