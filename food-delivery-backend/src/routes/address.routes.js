import express from "express";

import {
  createAddress,
  getAddresses,
  updateAddress,
  deleteAddress,
  setDefaultAddress,
} from "../controllers/address.controller.js";

import {
  createAddressValidator,
  updateAddressValidator,
  addressIdValidator,
} from "../validators/address.validator.js";

import validate from "../middlewares/validation.middleware.js";

import { protect, authorize } from "../middlewares/auth.middleware.js";

import { ROLES } from "../constants/roles.js";

const router = express.Router();

router.post(
  "/",

  protect,

  authorize(ROLES.CUSTOMER),

  createAddressValidator,

  validate,

  createAddress,
);

router.get(
  "/",

  protect,

  authorize(ROLES.CUSTOMER),

  getAddresses,
);

router.patch(
  "/:id",

  protect,

  authorize(ROLES.CUSTOMER),

  addressIdValidator,

  updateAddressValidator,

  validate,

  updateAddress,
);

router.delete(
  "/:id",

  protect,

  authorize(ROLES.CUSTOMER),

  addressIdValidator,

  validate,

  deleteAddress,
);

router.patch(
  "/:id/default",

  protect,

  authorize(ROLES.CUSTOMER),

  addressIdValidator,

  validate,

  setDefaultAddress,
);

export default router;
