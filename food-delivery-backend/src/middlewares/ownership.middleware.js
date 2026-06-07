import Restaurant from "../models/restaurant.model.js";
import ApiError from "../utils/ApiError.js";

export const checkRestaurantOwnership = async (req, res, next) => {
  const restaurant = await Restaurant.findById(req.params.id);

  if (!restaurant) {
    return next(new ApiError(404, "Restaurant not found"));
  }

  if (
    req.user.role !== "admin" &&
    restaurant.owner.toString() !== req.user._id.toString()
  ) {
    return next(new ApiError(403, "Access denied"));
  }

  req.restaurant = restaurant;

  next();
};
