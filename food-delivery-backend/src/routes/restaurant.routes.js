import express from "express";

import {
  createRestaurant,
  getAllRestaurants,
  getRestaurantById,
  updateRestaurant,
  deleteRestaurant,
} from "../controllers/restaurant.controller.js";

import { protect, authorize } from "../middlewares/auth.middleware.js";

import { ROLES } from "../constants/roles.js";

import {
  createRestaurantValidator,
  updateRestaurantValidator,
} from "../validators/restaurant.validator.js";

import validate from "../middlewares/validation.middleware.js";

const router = express.Router();

// Create Restaurant

router.post(
  "/",

  protect,

  authorize(ROLES.ADMIN, ROLES.RESTAURANT_OWNER),

  createRestaurantValidator,

  validate,

  createRestaurant,
);

// Get All

router.get("/", getAllRestaurants);

// Get By Id

router.get("/:id", getRestaurantById);

// Update
router.patch(
  "/:id",

  protect,

  authorize(ROLES.ADMIN, ROLES.RESTAURANT_OWNER),

  updateRestaurantValidator,

  validate,

  updateRestaurant,
);
// Delete

router.delete(
  "/:id",

  protect,

  authorize(ROLES.ADMIN),

  deleteRestaurant,
);

export default router;
