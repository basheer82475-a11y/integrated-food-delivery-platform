// import Restaurant from "../models/restaurant.model.js";
// import ApiError from "../utils/ApiError.js";

// export const createRestaurantService = async (restaurantData, ownerId) => {
//   const existingRestaurant = await Restaurant.findOne({
//     email: restaurantData.email,
//   });

//   if (existingRestaurant) {
//     throw new ApiError(409, "Restaurant already exists with this email");
//   }

//   const restaurant = await Restaurant.create({
//     ...restaurantData,
//     owner: ownerId,
//   });

//   return restaurant;
// };

// export const getAllRestaurantsService = async () => {
//   return await Restaurant.find().populate("owner", "name email role");
// };

// export const getRestaurantByIdService = async (restaurantId) => {
//   const restaurant = await Restaurant.findById(restaurantId).populate(
//     "owner",
//     "name email role",
//   );

//   if (!restaurant) {
//     throw new ApiError(404, "Restaurant not found");
//   }

//   return restaurant;
// };

// export const updateRestaurantService = async (restaurantId, updateData) => {
//   const restaurant = await Restaurant.findByIdAndUpdate(
//     restaurantId,
//     updateData,
//     {
//       new: true,
//       runValidators: true,
//     },
//   );

//   if (!restaurant) {
//     throw new ApiError(404, "Restaurant not found");
//   }

//   return restaurant;
// };

// export const deleteRestaurantService = async (restaurantId) => {
//   const restaurant = await Restaurant.findByIdAndUpdate(
//     restaurantId,
//     {
//       isActive: false,
//     },
//     {
//       new: true,
//     },
//   );

//   if (!restaurant) {
//     throw new ApiError(404, "Restaurant not found");
//   }

//   return restaurant;
// };

import Restaurant from "../models/restaurant.model.js";

export const createRestaurantService = async (data) => {
  return await Restaurant.create(data);
};

export const getAllRestaurantsService = async () => {
  return await Restaurant.find();
};

export const getRestaurantByIdService = async (id) => {
  return await Restaurant.findById(id);
};

export const updateRestaurantService = async (id, data) => {
  return await Restaurant.findByIdAndUpdate(id, data, { new: true });
};

export const deleteRestaurantService = async (id) => {
  return await Restaurant.findByIdAndDelete(id);
};
