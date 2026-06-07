import Menu from "../models/menu.model.js";
import Restaurant from "../models/restaurant.model.js";
import Category from "../models/category.model.js";
import ApiError from "../utils/ApiError.js";

export const createMenuService = async (menuData) => {
  const restaurant = await Restaurant.findById(menuData.restaurant);

  if (!restaurant) {
    throw new ApiError(404, "Restaurant not found");
  }

  const category = await Category.findById(menuData.category);

  if (category.restaurant.toString() !== restaurant._id.toString()) {
    throw new ApiError(400, "Category does not belong to restaurant");
  }

  const existingMenu = await Menu.findOne({
    name: menuData.name,
    restaurant: menuData.restaurant,
  });

  if (existingMenu) {
    throw new ApiError(409, "Menu item already exists");
  }

  return await Menu.create(menuData);
};

export const getAllMenuService = async () => {
  return await Menu.find({
    isAvailable: true,
  })
    .populate("restaurant", "name city")
    .populate("category", "name");
};

export const getMenuByIdService = async (menuId) => {
  const menu = await Menu.findById(menuId)
    .populate("restaurant", "name city")
    .populate("category", "name");

  if (!menu) {
    throw new ApiError(404, "Menu item not found");
  }

  return menu;
};

export const updateMenuService = async (menuId, updateData) => {
  const menu = await Menu.findByIdAndUpdate(menuId, updateData, {
    new: true,
    runValidators: true,
  });

  if (!menu) {
    throw new ApiError(404, "Menu item not found");
  }

  return menu;
};

export const deleteMenuService = async (menuId) => {
  const menu = await Menu.findByIdAndDelete(menuId);

  if (!menu) {
    throw new ApiError(404, "Menu not found");
  }

  return menu;
};
