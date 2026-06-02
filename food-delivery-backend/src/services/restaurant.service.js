import Restaurant from "../models/restaurant.model.js";

export const createRestaurantService = async (data, userId) => {
  return await Restaurant.create({
    ...data,
    owner: userId,
  });
};

export const getAllRestaurantsService = async () => {
  return await Restaurant.find().populate("owner", "name email role");
};

export const getRestaurantByIdService = async (id) => {
  return await Restaurant.findById(id).populate("owner", "name email role");
};

export const updateRestaurantService = async (id, data) => {
  return await Restaurant.findByIdAndUpdate(id, data, {
    new: true,
    runValidators: true,
  });
};

export const deleteRestaurantService = async (id) => {
  return await Restaurant.findByIdAndDelete(id);
};
