import Address from "../models/address.model.js";
import ApiError from "../utils/ApiError.js";

export const createAddressService = async (userId, addressData) => {
  if (addressData.isDefault) {
    await Address.updateMany(
      { user: userId },

      { isDefault: false },
    );
  }

  return await Address.create({
    ...addressData,

    user: userId,
  });
};

export const getAddressesService = async (userId) => {
  return await Address.find({
    user: userId,
  }).sort({
    isDefault: -1,
  });
};

export const updateAddressService = async (userId, addressId, updateData) => {
  const address = await Address.findOne({
    _id: addressId,

    user: userId,
  });

  if (!address) {
    throw new ApiError(404, "Address not found");
  }

  if (updateData.isDefault) {
    await Address.updateMany(
      { user: userId },

      { isDefault: false },
    );
  }

  Object.assign(address, updateData);

  await address.save();

  return address;
};

export const deleteAddressService = async (userId, addressId) => {
  const deleted = await Address.findOneAndDelete({
    _id: addressId,

    user: userId,
  });

  if (!deleted) {
    throw new ApiError(404, "Address not found");
  }

  return deleted;
};

export const setDefaultAddressService = async (userId, addressId) => {
  const address = await Address.findOne({
    _id: addressId,

    user: userId,
  });

  if (!address) {
    throw new ApiError(404, "Address not found");
  }

  await Address.updateMany(
    { user: userId },

    { isDefault: false },
  );

  address.isDefault = true;

  await address.save();

  return address;
};
