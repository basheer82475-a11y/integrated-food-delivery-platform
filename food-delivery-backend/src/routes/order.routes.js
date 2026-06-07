import express from "express";

import {
  createOrder,
  getAllOrders,
  getOrderById,
  updateOrderStatus,
} from "../controllers/order.controller.js";

import { createOrderValidator } from "../validators/order.validator.js";

import validate from "../middlewares/validation.middleware.js";

import { protect, authorize } from "../middlewares/auth.middleware.js";

import { checkOrderOwnership } from "../middlewares/ownership.middleware.js";

import { ROLES } from "../constants/roles.js";

const router = express.Router();

// Create Order

router.post(
  "/",

  protect,

  authorize(ROLES.CUSTOMER),

  createOrderValidator,

  validate,

  createOrder,
);

// Get All Orders

router.get(
  "/",

  protect,

  authorize(ROLES.ADMIN, ROLES.RESTAURANT_OWNER, ROLES.CUSTOMER),

  getAllOrders,
);
// Get Single Order

router.get(
  "/:id",

  protect,

  getOrderById,
);

// Update Order Status

router.patch(
  "/:id/status",

  protect,

  authorize(ROLES.ADMIN, ROLES.RESTAURANT_OWNER),

  checkOrderOwnership,

  updateOrderStatus,
);
export default router;
