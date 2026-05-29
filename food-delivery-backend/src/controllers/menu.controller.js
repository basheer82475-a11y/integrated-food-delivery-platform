import asyncHandler from "../utils/asyncHandler.js";

import {
  createMenuService,
  getAllMenuService,
  getMenuByIdService,
  updateMenuService,
  deleteMenuService,
} from "../services/menu.service.js";

export const createMenu = asyncHandler(async (req, res) => {
  const menu = await createMenuService(req.body);

  res.status(201).json({
    success: true,
    message: "Menu item created successfully",
    data: menu,
  });
});

export const getAllMenus = asyncHandler(async (req, res) => {
  const menus = await getAllMenuService();

  res.status(200).json({
    success: true,
    count: menus.length,
    data: menus,
  });
});

export const getMenuById = asyncHandler(async (req, res) => {
  const menu = await getMenuByIdService(req.params.id);

  res.status(200).json({
    success: true,
    data: menu,
  });
});

export const updateMenu = asyncHandler(async (req, res) => {
  const menu = await updateMenuService(req.params.id, req.body);

  res.status(200).json({
    success: true,
    message: "Menu updated successfully",
    data: menu,
  });
});

export const deleteMenu = asyncHandler(async (req, res) => {
  await deleteMenuService(req.params.id);

  res.status(200).json({
    success: true,
    message: "Menu deleted successfully",
  });
});
