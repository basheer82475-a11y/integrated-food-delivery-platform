import express from "express";

import {
  createOrder,
  getAllOrders,
  getOrderById,
  updateOrderStatus,
} from "../controllers/order.controller.js";

import { createOrderValidator } from "../validators/order.validator.js";

import validate from "../middlewares/validation.middleware.js";

import { protect } from "../middlewares/auth.middleware.js";

const router = express.Router();

router.post("/", protect, createOrderValidator, validate, createOrder);

router.get("/", protect, getAllOrders);

router.get("/:id", protect, getOrderById);

router.patch("/:id/status", protect, updateOrderStatus);

export default router;
