import Category from "../models/category.model.js";
import Restaurant from "../models/restaurant.model.js";
import ApiError from "../utils/ApiError.js";

export const createCategoryService = async (categoryData) => {
  const restaurant = await Restaurant.findById(categoryData.restaurant);

  if (!restaurant) {
    throw new ApiError(404, "Restaurant not found");
  }

  const existingCategory = await Category.findOne({
    name: categoryData.name,
    restaurant: categoryData.restaurant,
  });

  if (existingCategory) {
    throw new ApiError(409, "Category already exists");
  }

  return await Category.create(categoryData);
};

export const getAllCategoriesService = async () => {
  return await Category.find({
    isActive: true,
  }).populate("restaurant", "name city");
};

export const getCategoryByIdService = async (categoryId) => {
  const category = await Category.findById(categoryId).populate(
    "restaurant",
    "name city",
  );

  if (!category) {
    throw new ApiError(404, "Category not found");
  }

  return category;
};

export const updateCategoryService = async (categoryId, updateData) => {
  const category = await Category.findByIdAndUpdate(categoryId, updateData, {
    new: true,
    runValidators: true,
  });

  if (!category) {
    throw new ApiError(404, "Category not found");
  }

  return category;
};

export const deleteCategoryService = async (categoryId) => {
  const category = await Category.findByIdAndUpdate(
    categoryId,
    {
      isActive: false,
    },
    {
      new: true,
    },
  );

  if (!category) {
    throw new ApiError(404, "Category not found");
  }

  return category;
};
