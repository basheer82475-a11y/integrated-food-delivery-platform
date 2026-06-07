import Restaurant from "../models/restaurant.model.js";
import ApiError from "../utils/ApiError.js";
import Category from "../models/category.model.js";
import Order from "../models/order.model.js";

import Menu from "../models/menu.model.js";
export const checkRestaurantOwnership = async (req, res, next) => {
  const restaurant = await Restaurant.findById(req.params.id);

  if (!restaurant) {
    return next(new ApiError(404, "Restaurant not found"));
  }

  if (
    req.user.role !== "admin" &&
    restaurant.owner.toString() !== req.user._id.toString()
  ) {
    return next(new ApiError(403, "Access denied"));
  }

  req.restaurant = restaurant;

  next();
};
export const checkCategoryOwnership = async (req, res, next) => {
  const category = await Category.findById(req.params.id).populate(
    "restaurant",
  );

  if (!category) {
    return next(new ApiError(404, "Category not found"));
  }

  if (
    req.user.role !== "admin" &&
    category.restaurant.owner.toString() !== req.user._id.toString()
  ) {
    return next(new ApiError(403, "You cannot access this category"));
  }

  req.category = category;

  next();
};

export const checkMenuOwnership = async (req, res, next) => {
  const menu = await Menu.findById(req.params.id).populate("restaurant");

  if (!menu) {
    return next(new ApiError(404, "Menu item not found"));
  }

  if (
    req.user.role !== "admin" &&
    menu.restaurant.owner.toString() !== req.user._id.toString()
  ) {
    return next(new ApiError(403, "You cannot access this menu"));
  }

  req.menu = menu;

  next();
};
export const checkOrderOwnership = async (req, res, next) => {
  const order = await Order.findById(req.params.id).populate("restaurant");

  if (!order) {
    return next(new ApiError(404, "Order not found"));
  }

  if (req.user.role === "admin") {
    req.order = order;

    return next();
  }

  const restaurant = await Restaurant.findById(order.restaurant._id);

  if (restaurant.owner.toString() !== req.user._id.toString()) {
    return next(new ApiError(403, "You cannot access this order"));
  }

  req.order = order;

  next();
};
