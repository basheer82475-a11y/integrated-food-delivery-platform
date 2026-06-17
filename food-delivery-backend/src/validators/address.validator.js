import { body, param } from "express-validator";

export const createAddressValidator = [
  body("fullName")
    .trim()
    .notEmpty()
    .withMessage("Full name required")
    .isLength({ min: 2, max: 100 })
    .withMessage("Invalid full name"),

  body("phone").trim().notEmpty().withMessage("Phone required"),

  body("addressLine").trim().notEmpty().withMessage("Address required"),

  body("city").trim().notEmpty().withMessage("City required"),

  body("state").trim().notEmpty().withMessage("State required"),

  body("zipCode").trim().notEmpty().withMessage("Zip code required"),

  body("landmark").optional().trim(),

  body("isDefault")
    .optional()
    .isBoolean()
    .withMessage("isDefault must be boolean"),
];

export const updateAddressValidator = [
  body("fullName").optional().trim(),

  body("phone").optional().trim(),

  body("addressLine").optional().trim(),

  body("city").optional().trim(),

  body("state").optional().trim(),

  body("zipCode").optional().trim(),

  body("landmark").optional().trim(),

  body("isDefault").optional().isBoolean(),
];

export const addressIdValidator = [
  param("id").isMongoId().withMessage("Invalid address id"),
];
