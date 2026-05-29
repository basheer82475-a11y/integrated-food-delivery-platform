import { body } from "express-validator";

export const createOrderValidator = [
  body("restaurant")
    .notEmpty()
    .withMessage("Restaurant id is required")
    .isMongoId()
    .withMessage("Invalid restaurant id"),

  body("items").isArray({ min: 1 }).withMessage("At least one item required"),

  body("items.*.menuItem").isMongoId().withMessage("Invalid menu item id"),

  body("items.*.quantity")
    .isInt({ min: 1 })
    .withMessage("Quantity must be greater than 0"),

  body("deliveryAddress")
    .trim()
    .notEmpty()
    .withMessage("Delivery address required"),

  body("paymentMethod")
    .optional()
    .isIn(["COD", "ONLINE"])
    .withMessage("Invalid payment method"),
];
