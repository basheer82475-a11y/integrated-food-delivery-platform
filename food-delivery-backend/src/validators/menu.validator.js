import { body } from "express-validator";

export const createMenuValidator = [
  body("name")
    .trim()
    .notEmpty()
    .withMessage("Menu item name is required")
    .isLength({ min: 2, max: 100 })
    .withMessage("Name must be between 2 and 100 chars"),

  body("description").optional().trim(),

  body("price")
    .notEmpty()
    .withMessage("Price is required")
    .isFloat({ min: 0 })
    .withMessage("Price must be greater than 0"),

  body("restaurant")
    .notEmpty()
    .withMessage("Restaurant id required")
    .isMongoId()
    .withMessage("Invalid restaurant id"),

  body("category")
    .notEmpty()
    .withMessage("Category id required")
    .isMongoId()
    .withMessage("Invalid category id"),

  body("preparationTime")
    .optional()
    .isNumeric()
    .withMessage("Preparation time must be numeric"),

  body("rating")
    .optional()
    .isFloat({
      min: 0,
      max: 5,
    })
    .withMessage("Rating must be between 0 and 5"),

  body("isVeg").optional().isBoolean(),

  body("isAvailable").optional().isBoolean(),
];
