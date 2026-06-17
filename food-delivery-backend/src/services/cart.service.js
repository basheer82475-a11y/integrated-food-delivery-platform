import Cart from "../models/cart.model.js";
import Menu from "../models/menu.model.js";
import ApiError from "../utils/ApiError.js";
import Order from "../models/order.model.js";
import Address from "../models/address.model.js";

// ==============================
// Add To Cart
// ==============================

export const addToCartService = async (userId, menuItemId, quantity) => {
  const menu = await Menu.findById(menuItemId);

  if (!menu) {
    throw new ApiError(404, "Menu item not found");
  }

  if (!menu.isAvailable) {
    throw new ApiError(400, "Menu item is unavailable");
  }

  let cart = await Cart.findOne({
    user: userId,
  });

  if (!cart) {
    cart = await Cart.create({
      user: userId,
      restaurant: menu.restaurant,
      items: [],
    });
  }

  if (
    cart.restaurant &&
    cart.restaurant.toString() !== menu.restaurant.toString()
  ) {
    throw new ApiError(400, "You can only order from one restaurant at a time");
  }

  const existingItem = cart.items.find(
    (item) => item.menuItem.toString() === menuItemId,
  );

  if (existingItem) {
    existingItem.quantity += quantity;
  } else {
    cart.items.push({
      menuItem: menuItemId,
      quantity,
    });
  }

  await cart.save();

  return cart;
};

// ==============================
// Get Cart
// ==============================

export const getCartService = async (userId) => {
  return await Cart.findOne({
    user: userId,
  })
    .populate("restaurant", "name")
    .populate("items.menuItem", "name price image");
};

// ==============================
// Remove Cart Item
// ==============================

export const removeCartItemService = async (userId, menuId) => {
  const cart = await Cart.findOne({
    user: userId,
  });

  if (!cart) {
    throw new ApiError(404, "Cart not found");
  }

  cart.items = cart.items.filter((item) => item.menuItem.toString() !== menuId);

  if (cart.items.length === 0) {
    cart.restaurant = null;
  }

  await cart.save();

  return cart;
};

// ==============================
// Clear Cart
// ==============================

export const clearCartService = async (userId) => {
  const cart = await Cart.findOne({
    user: userId,
  });

  if (!cart) {
    throw new ApiError(404, "Cart not found");
  }

  cart.items = [];
  cart.restaurant = null;

  await cart.save();

  return cart;
};

// ==============================
// Checkout Cart
// ==============================

export const checkoutCartService = async (userId, addressId, paymentMethod) => {
  const cart = await Cart.findOne({
    user: userId,
  }).populate("items.menuItem");

  if (!cart || cart.items.length === 0) {
    throw new ApiError(400, "Cart is empty");
  }

  let address;

  if (addressId) {
    address = await Address.findOne({
      _id: addressId,
      user: userId,
    });
  } else {
    address = await Address.findOne({
      user: userId,
      isDefault: true,
    });
  }

  if (!address) {
    throw new ApiError(404, "Delivery address not found");
  }

  let totalAmount = 0;

  const items = cart.items.map((item) => {
    totalAmount += item.menuItem.price * item.quantity;

    return {
      menuItem: item.menuItem._id,
      quantity: item.quantity,
      price: item.menuItem.price,
    };
  });

  const restaurant = cart.restaurant;

  const formattedAddress = `${address.addressLine},
${address.city},
${address.state},
${address.zipCode}`;

  const order = await Order.create({
    user: userId,
    restaurant,
    items,
    totalAmount,
    deliveryAddress: formattedAddress,
    paymentMethod,
  });

  cart.items = [];
  cart.restaurant = null;

  await cart.save();

  return order;
};
