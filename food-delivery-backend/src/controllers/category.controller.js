import asyncHandler from "../utils/asyncHandler.js";

import {
  createCategoryService,
  getAllCategoriesService,
  getCategoryByIdService,
  updateCategoryService,
  deleteCategoryService,
  getMyCategoriesService,
} from "../services/category.service.js";

export const createCategory = asyncHandler(async (req, res) => {
  const category = await createCategoryService(req.body, req.user);

  res.status(201).json({
    success: true,
    message: "Category created successfully",
    data: category,
  });
});

export const getAllCategories = asyncHandler(async (req, res) => {
  const categories = await getAllCategoriesService();

  res.status(200).json({
    success: true,
    count: categories.length,
    data: categories,
  });
});

export const getCategoryById = asyncHandler(async (req, res) => {
  const category = await getCategoryByIdService(req.params.id);

  res.status(200).json({
    success: true,
    data: category,
  });
});

export const updateCategory = asyncHandler(async (req, res) => {
  const category = await updateCategoryService(req.params.id, req.body);

  res.status(200).json({
    success: true,
    message: "Category updated successfully",
    data: category,
  });
});

export const deleteCategory = asyncHandler(async (req, res) => {
  await deleteCategoryService(req.params.id);

  res.status(200).json({
    success: true,
    message: "Category deleted successfully",
  });
});
export const getMyCategories = asyncHandler(async (req, res) => {
  const categories = await getMyCategoriesService(req.user._id);

  res.status(200).json({
    success: true,
    count: categories.length,
    data: categories,
  });
});
