import asyncHandler from "../utils/asyncHandler.js";
import {
  createPaymentOrderService,
  verifyPaymentService,
  getPaymentStatusService,
} from "../services/payment.service.js";

export const createPaymentOrder = asyncHandler(async (req, res) => {
  const { orderId } = req.body;

  const payment = await createPaymentOrderService(orderId);

  res.status(200).json({
    success: true,
    message: "Payment order created",
    data: payment,
  });
});

export const verifyPayment = asyncHandler(async (req, res) => {
  const {
    orderId,
    razorpayPaymentId,
    razorpayOrderId,
    razorpaySignature,
  } = req.body;

  const result = await verifyPaymentService(
    orderId,
    razorpayPaymentId,
    razorpayOrderId,
    razorpaySignature
  );

  res.status(200).json({
    success: true,
    message: "Payment verified successfully",
    data: result,
  });
});

export const getPaymentStatus = asyncHandler(async (req, res) => {
  const { orderId } = req.params;

  const status = await getPaymentStatusService(orderId);

  res.status(200).json({
    success: true,
    data: status,
  });
});
