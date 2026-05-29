import asyncHandler from "../utils/asyncHandler.js";

import {
  createOrderService,
  getAllOrdersService,
  getOrderByIdService,
  updateOrderStatusService,
} from "../services/order.service.js";

export const createOrder = asyncHandler(async (req, res) => {
  const order = await createOrderService(req.body, req.user._id);

  res.status(201).json({
    success: true,
    message: "Order created successfully",
    data: order,
  });
});

export const getAllOrders = asyncHandler(async (req, res) => {
  const orders = await getAllOrdersService();

  res.status(200).json({
    success: true,
    count: orders.length,
    data: orders,
  });
});

export const getOrderById = asyncHandler(async (req, res) => {
  const order = await getOrderByIdService(req.params.id);

  res.status(200).json({
    success: true,
    data: order,
  });
});

export const updateOrderStatus = asyncHandler(async (req, res) => {
  const order = await updateOrderStatusService(
    req.params.id,
    req.body.orderStatus,
  );

  res.status(200).json({
    success: true,
    message: "Order status updated",
    data: order,
  });
});
