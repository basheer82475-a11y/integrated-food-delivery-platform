import asyncHandler from "../utils/asyncHandler.js";

import {
  createAddressService,
  getAddressesService,
  updateAddressService,
  deleteAddressService,
  setDefaultAddressService,
} from "../services/address.service.js";

export const createAddress = asyncHandler(async (req, res) => {
  const address = await createAddressService(
    req.user._id,

    req.body,
  );

  res.status(201).json({
    success: true,

    message: "Address created successfully",

    data: address,
  });
});

export const getAddresses = asyncHandler(async (req, res) => {
  const addresses = await getAddressesService(req.user._id);

  res.status(200).json({
    success: true,

    count: addresses.length,

    data: addresses,
  });
});

export const updateAddress = asyncHandler(async (req, res) => {
  const address = await updateAddressService(
    req.user._id,

    req.params.id,

    req.body,
  );

  res.status(200).json({
    success: true,

    message: "Address updated",

    data: address,
  });
});

export const deleteAddress = asyncHandler(async (req, res) => {
  await deleteAddressService(
    req.user._id,

    req.params.id,
  );

  res.status(200).json({
    success: true,

    message: "Address deleted",
  });
});

export const setDefaultAddress = asyncHandler(async (req, res) => {
  const address = await setDefaultAddressService(
    req.user._id,

    req.params.id,
  );

  res.status(200).json({
    success: true,

    message: "Default address updated",

    data: address,
  });
});
