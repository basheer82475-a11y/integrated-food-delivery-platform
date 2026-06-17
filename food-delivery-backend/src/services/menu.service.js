import Menu from "../models/menu.model.js";
import Restaurant from "../models/restaurant.model.js";
import Category from "../models/category.model.js";
import ApiError from "../utils/ApiError.js";

// ==============================
// Create Menu
// ==============================

export const createMenuService = async (menuData) => {
  const restaurant = await Restaurant.findById(menuData.restaurant);

  if (!restaurant || !restaurant.isActive) {
    throw new ApiError(404, "Restaurant not found");
  }

  const category = await Category.findById(menuData.category);

  if (!category || !category.isActive) {
    throw new ApiError(404, "Category not found");
  }

  if (category.restaurant.toString() !== restaurant._id.toString()) {
    throw new ApiError(400, "Category does not belong to restaurant");
  }

  const existingMenu = await Menu.findOne({
    name: menuData.name.trim(),
    restaurant: menuData.restaurant,
    isAvailable: true,
  });

  if (existingMenu) {
    throw new ApiError(409, "Menu item already exists");
  }

  return await Menu.create({
    ...menuData,
    name: menuData.name.trim(),
  });
};

// ==============================
// Get All Menus
// ==============================

export const getAllMenuService = async () => {
  return await Menu.find({
    isAvailable: true,
  })
    .populate("restaurant", "name city")
    .populate("category", "name");
};

// ==============================
// Get Menu By Id
// ==============================

export const getMenuByIdService = async (menuId) => {
  const menu = await Menu.findById(menuId)
    .populate("restaurant", "name city")
    .populate("category", "name");

  if (!menu || !menu.isAvailable) {
    throw new ApiError(404, "Menu item not found");
  }

  return menu;
};

// ==============================
// Update Menu
// ==============================

export const updateMenuService = async (menuId, updateData) => {
  const menu = await Menu.findById(menuId);

  if (!menu) {
    throw new ApiError(404, "Menu item not found");
  }

  if (updateData.name) {
    const existingMenu = await Menu.findOne({
      _id: { $ne: menuId },

      restaurant: menu.restaurant,

      name: updateData.name.trim(),

      isAvailable: true,
    });

    if (existingMenu) {
      throw new ApiError(409, "Menu item already exists");
    }

    menu.name = updateData.name.trim();
  }

  Object.assign(menu, updateData);

  await menu.save();

  return menu;
};

// ==============================
// Delete Menu (Soft Delete)
// ==============================

export const deleteMenuService = async (menuId) => {
  const menu = await Menu.findById(menuId);

  if (!menu) {
    throw new ApiError(404, "Menu item not found");
  }

  menu.isAvailable = false;

  await menu.save();

  return menu;
};
// ==============================
// Get My Menus
// ==============================

export const getMyMenusService = async (ownerId) => {
  return await Menu.find({
    isAvailable: true,
  })
    .populate({
      path: "restaurant",
      match: {
        owner: ownerId,
        isActive: true,
      },
      select: "name city",
    })
    .populate("category", "name")
    .then((menus) => menus.filter((menu) => menu.restaurant));
};
