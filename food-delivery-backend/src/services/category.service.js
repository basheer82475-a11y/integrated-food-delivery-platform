import Category from "../models/category.model.js";
import Restaurant from "../models/restaurant.model.js";
import ApiError from "../utils/ApiError.js";

// ==============================
// Create Category
// ==============================

export const createCategoryService = async (categoryData, currentUser) => {
  const restaurant = await Restaurant.findById(categoryData.restaurant);

  if (!restaurant) {
    throw new ApiError(404, "Restaurant not found");
  }

  if (
    currentUser.role !== "admin" &&
    restaurant.owner.toString() !== currentUser._id.toString()
  ) {
    throw new ApiError(403, "You cannot create category for this restaurant");
  }

  const existingCategory = await Category.findOne({
    name: categoryData.name.trim(),

    restaurant: categoryData.restaurant,

    isActive: true,
  });

  if (existingCategory) {
    throw new ApiError(409, "Category already exists");
  }

  return await Category.create({
    ...categoryData,

    name: categoryData.name.trim(),
  });
};

// ==============================
// Get All Categories
// ==============================

export const getAllCategoriesService = async () => {
  return await Category.find({
    isActive: true,
  }).populate("restaurant", "name city");
};

// ==============================
// Get Category By Id
// ==============================

export const getCategoryByIdService = async (categoryId) => {
  const category = await Category.findOne({
    _id: categoryId,
    isActive: true,
  }).populate("restaurant", "name city");

  if (!category) {
    throw new ApiError(404, "Category not found");
  }

  return category;
};

// ==============================
// Update Category
// ==============================

export const updateCategoryService = async (categoryId, updateData) => {
  const category = await Category.findById(categoryId);

  if (!category) {
    throw new ApiError(404, "Category not found");
  }

  if (updateData.name) {
    const duplicateCategory = await Category.findOne({
      _id: {
        $ne: categoryId,
      },

      restaurant: category.restaurant,

      name: updateData.name.trim(),

      isActive: true,
    });

    if (duplicateCategory) {
      throw new ApiError(409, "Category already exists");
    }

    category.name = updateData.name.trim();
  }

  if (updateData.description !== undefined) {
    category.description = updateData.description;
  }

  if (updateData.image !== undefined) {
    category.image = updateData.image;
  }

  await category.save();

  return category;
};

// ==============================
// Delete Category
// ==============================

export const deleteCategoryService = async (categoryId) => {
  const category = await Category.findById(categoryId);

  if (!category) {
    throw new ApiError(404, "Category not found");
  }

  category.isActive = false;

  await category.save();

  return category;
};
// ==============================
// Get My Categories
// ==============================

export const getMyCategoriesService = async (ownerId) => {
  return await Category.find({
    isActive: true,
  })
    .populate({
      path: "restaurant",
      match: {
        owner: ownerId,
        isActive: true,
      },
      select: "name city",
    })
    .then((categories) => categories.filter((category) => category.restaurant));
};
