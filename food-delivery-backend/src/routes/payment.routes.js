import express from "express";
import {
  createPaymentOrder,
  verifyPayment,
  getPaymentStatus,
} from "../controllers/payment.controller.js";
import { protect } from "../middlewares/auth.middleware.js";

const router = express.Router();

// Create payment order (initiate payment)
router.post("/create-order", protect, createPaymentOrder);

// Verify payment after user completes payment
router.post("/verify", protect, verifyPayment);

// Get payment status for an order
router.get("/status/:orderId", protect, getPaymentStatus);

export default router;
