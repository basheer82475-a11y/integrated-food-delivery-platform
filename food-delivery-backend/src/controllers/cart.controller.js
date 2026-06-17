import asyncHandler from "../utils/asyncHandler.js";

import {
  addToCartService,
  getCartService,
  removeCartItemService,
  clearCartService,
  checkoutCartService,
} from "../services/cart.service.js";

export const addToCart = asyncHandler(async (req, res) => {
  const cart = await addToCartService(
    req.user._id,
    req.body.menuItem,
    req.body.quantity,
  );

  res.status(200).json({
    success: true,
    message: "Item added to cart",
    data: cart,
  });
});

export const getCart = asyncHandler(async (req, res) => {
  const cart = await getCartService(req.user._id);

  res.status(200).json({
    success: true,
    data: cart,
  });
});

export const removeCartItem = asyncHandler(async (req, res) => {
  const cart = await removeCartItemService(req.user._id, req.params.menuId);

  res.status(200).json({
    success: true,
    message: "Item removed from cart",
    data: cart,
  });
});

export const clearCart = asyncHandler(async (req, res) => {
  const cart = await clearCartService(req.user._id);

  res.status(200).json({
    success: true,
    message: "Cart cleared",
    data: cart,
  });
});
export const checkoutCart = asyncHandler(async (req, res) => {
  const order = await checkoutCartService(
    req.user._id,

    req.body.addressId,

    req.body.paymentMethod,
  );

  res.status(201).json({
    success: true,

    message: "Checkout successful",

    data: order,
  });
});
