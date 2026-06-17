import Restaurant from "../models/restaurant.model.js";
import ApiError from "../utils/ApiError.js";

// ==============================
// Create Restaurant
// ==============================

export const createRestaurantService = async (data, userId) => {
  const existingRestaurant = await Restaurant.findOne({
    email: data.email,
  });

  if (existingRestaurant) {
    throw new ApiError(409, "Restaurant email already exists");
  }

  return await Restaurant.create({
    ...data,
    owner: userId,
  });
};

// ==============================
// Get All Restaurants
// ==============================

export const getAllRestaurantsService = async () => {
  return await Restaurant.find({
    isActive: true,
  }).populate("owner", "name email role");
};

// ==============================
// Get Restaurant By Id
// ==============================

export const getRestaurantByIdService = async (id) => {
  const restaurant = await Restaurant.findOne({
    _id: id,
    isActive: true,
  }).populate("owner", "name email role");

  if (!restaurant) {
    throw new ApiError(404, "Restaurant not found");
  }

  return restaurant;
};

// ==============================
// Update Restaurant
// ==============================

export const updateRestaurantService = async (id, data) => {
  const restaurant = await Restaurant.findById(id);

  if (!restaurant) {
    throw new ApiError(404, "Restaurant not found");
  }

  if (data.email && data.email !== restaurant.email) {
    const existingRestaurant = await Restaurant.findOne({
      email: data.email,
      _id: { $ne: id },
    });

    if (existingRestaurant) {
      throw new ApiError(409, "Restaurant email already exists");
    }
  }

  Object.assign(restaurant, data);

  await restaurant.save();

  return restaurant;
};

// ==============================
// Delete Restaurant (Soft Delete)
// ==============================

export const deleteRestaurantService = async (id) => {
  const restaurant = await Restaurant.findById(id);

  if (!restaurant) {
    throw new ApiError(404, "Restaurant not found");
  }

  restaurant.isActive = false;

  await restaurant.save();

  return restaurant;
};
// ==============================
// Get My Restaurants
// ==============================

export const getMyRestaurantsService = async (ownerId) => {
  return await Restaurant.find({
    owner: ownerId,
    isActive: true,
  });
};
