import { body } from "express-validator";

export const createRestaurantValidator = [
  body("name")
    .trim()
    .notEmpty()
    .withMessage("Restaurant name is required")
    .isLength({ min: 2, max: 100 })
    .withMessage("Name should be between 2-100 chars"),

  body("email")
    .trim()
    .isEmail()
    .withMessage("Valid email required")
    .normalizeEmail(),

  body("phone").trim().notEmpty().withMessage("Phone is required"),

  body("address").trim().notEmpty().withMessage("Address is required"),

  body("city").trim().notEmpty().withMessage("City is required"),

  body("state").trim().notEmpty().withMessage("State is required"),

  body("zipCode").trim().notEmpty().withMessage("Zip code required"),

  body("deliveryTime")
    .optional()
    .isNumeric()
    .withMessage("Delivery time must be number"),

  body("rating")
    .optional()
    .isFloat({ min: 0, max: 5 })
    .withMessage("Rating must be between 0 and 5"),
];
