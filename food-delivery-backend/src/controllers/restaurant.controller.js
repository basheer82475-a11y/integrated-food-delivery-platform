import asyncHandler from "../utils/asyncHandler.js";

import {
  createRestaurantService,
  getAllRestaurantsService,
  getRestaurantByIdService,
  updateRestaurantService,
  deleteRestaurantService,
  getMyRestaurantsService,
} from "../services/restaurant.service.js";

export const createRestaurant = asyncHandler(async (req, res) => {
  const restaurant = await createRestaurantService(req.body, req.user._id);

  res.status(201).json({
    success: true,
    message: "Restaurant created successfully",
    data: restaurant,
  });
});

export const getAllRestaurants = asyncHandler(async (req, res) => {
  const restaurants = await getAllRestaurantsService();

  res.status(200).json({
    success: true,
    count: restaurants.length,
    data: restaurants,
  });
});

export const getRestaurantById = asyncHandler(async (req, res) => {
  const restaurant = await getRestaurantByIdService(req.params.id);

  res.status(200).json({
    success: true,
    data: restaurant,
  });
});

export const updateRestaurant = asyncHandler(async (req, res) => {
  const restaurant = await updateRestaurantService(req.params.id, req.body);

  res.status(200).json({
    success: true,
    message: "Restaurant updated successfully",
    data: restaurant,
  });
});

export const deleteRestaurant = asyncHandler(async (req, res) => {
  await deleteRestaurantService(req.params.id);

  res.status(200).json({
    success: true,
    message: "Restaurant deleted successfully",
  });
});
export const getMyRestaurants = asyncHandler(async (req, res) => {
  const restaurants = await getMyRestaurantsService(req.user._id);

  res.status(200).json({
    success: true,
    count: restaurants.length,
    data: restaurants,
  });
});
