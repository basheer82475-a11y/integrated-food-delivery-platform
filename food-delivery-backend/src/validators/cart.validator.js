import { body, param } from "express-validator";

export const addToCartValidator = [
  body("menuItem")
    .notEmpty()
    .withMessage("Menu item id required")
    .isMongoId()
    .withMessage("Invalid menu item id"),

  body("quantity")
    .notEmpty()
    .withMessage("Quantity required")
    .isInt({ min: 1 })
    .withMessage("Quantity must be greater than 0"),
];

export const removeCartItemValidator = [
  param("menuId").isMongoId().withMessage("Invalid menu id"),
];
export const checkoutValidator = [
  body("addressId").optional().isMongoId().withMessage("Invalid address id"),

  body("paymentMethod")
    .optional()
    .isIn(["COD", "ONLINE"])
    .withMessage("Invalid payment method"),
];
