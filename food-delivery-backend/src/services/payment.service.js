import dotenv from "dotenv";
dotenv.config();

import Razorpay from "razorpay";
import crypto from "crypto";
import Order from "../models/order.model.js";
import ApiError from "../utils/ApiError.js";

const { RAZORPAY_KEY_ID, RAZORPAY_KEY_SECRET } = process.env;

if (!RAZORPAY_KEY_ID || !RAZORPAY_KEY_SECRET) {
  throw new Error(
    "Missing Razorpay env vars. Set RAZORPAY_KEY_ID and RAZORPAY_KEY_SECRET in .env"
  );
}

const razorpay = new Razorpay({
  key_id: RAZORPAY_KEY_ID,
  key_secret: RAZORPAY_KEY_SECRET,
});


export const createPaymentOrderService = async (orderId) => {
  const order = await Order.findById(orderId);

  if (!order) {
    throw new ApiError(404, "Order not found");
  }

  if (order.paymentStatus === "paid") {
    throw new ApiError(400, "Order already paid");
  }

  const options = {
    amount: Math.round(order.totalAmount * 100), // Convert to paise (Razorpay uses smallest unit)
    currency: "INR",
    receipt: orderId.toString(),
    notes: {
      orderId: orderId.toString(),
      customerId: order.user.toString(),
    },
  };

  try {
    const razorpayOrder = await razorpay.orders.create(options);

    // Store razorpay order ID in the order document
    order.razorpayOrderId = razorpayOrder.id;
    await order.save();

    return {
      orderId,
      razorpayOrderId: razorpayOrder.id,
      amount: razorpayOrder.amount,
      currency: razorpayOrder.currency,
      keyId: process.env.RAZORPAY_KEY_ID,
    };
  } catch (err) {
    throw new ApiError(500, "Failed to create payment order: " + err.message);
  }
};

export const verifyPaymentService = async (
  orderId,
  razorpayPaymentId,
  razorpayOrderId,
  razorpaySignature
) => {
  const order = await Order.findById(orderId);

  if (!order) {
    throw new ApiError(404, "Order not found");
  }

  // Verify signature
  const body = razorpayOrderId + "|" + razorpayPaymentId;
  const expectedSignature = crypto
    .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET)
    .update(body)
    .digest("hex");

  if (expectedSignature !== razorpaySignature) {
    // Payment verification failed
    order.paymentStatus = "failed";
    await order.save();
    throw new ApiError(400, "Payment signature verification failed");
  }

  // Payment verification successful
  order.paymentStatus = "paid";
  order.razorpayPaymentId = razorpayPaymentId;
  order.razorpaySignature = razorpaySignature;
  order.orderStatus = "confirmed";
  await order.save();

  return {
    success: true,
    message: "Payment verified successfully",
    order,
  };
};

export const getPaymentStatusService = async (orderId) => {
  const order = await Order.findById(orderId).populate(
    "user restaurant items.menuItem"
  );

  if (!order) {
    throw new ApiError(404, "Order not found");
  }

  return {
    orderId,
    paymentStatus: order.paymentStatus,
    orderStatus: order.orderStatus,
    amount: order.totalAmount,
    razorpayOrderId: order.razorpayOrderId,
  };
};
