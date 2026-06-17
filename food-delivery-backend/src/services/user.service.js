import User from "../models/user.model.js";
import ApiError from "../utils/ApiError.js";
import { ROLES } from "../constants/roles.js";

// ==============================
// Get All Users
// ==============================

export const getAllUsersService = async () => {
  return await User.find().select("-password");
};

// ==============================
// Get User By Id
// ==============================

export const getUserByIdService = async (userId) => {
  const user = await User.findById(userId).select("-password");

  if (!user) {
    throw new ApiError(404, "User not found");
  }

  return user;
};

// ==============================
// Update User Role
// ==============================

export const updateUserRoleService = async (
  targetUserId,
  role,
  currentUserId,
) => {
  const user = await User.findById(targetUserId);

  if (!user) {
    throw new ApiError(404, "User not found");
  }

  if (user._id.toString() === currentUserId.toString()) {
    throw new ApiError(400, "You cannot change your own role");
  }

  if (!Object.values(ROLES).includes(role)) {
    throw new ApiError(400, "Invalid role");
  }

  if (user.role === ROLES.ADMIN) {
    throw new ApiError(403, "Admin role cannot be modified");
  }

  user.role = role;

  await user.save();

  return user;
};

// ==============================
// Update User Status
// ==============================

export const updateUserStatusService = async (
  targetUserId,
  isActive,
  currentUserId,
) => {
  const user = await User.findById(targetUserId);

  if (!user) {
    throw new ApiError(404, "User not found");
  }

  if (user._id.toString() === currentUserId.toString()) {
    throw new ApiError(400, "You cannot deactivate yourself");
  }

  if (user.role === ROLES.ADMIN) {
    throw new ApiError(403, "Admin account cannot be modified");
  }

  user.isActive = isActive;

  await user.save();

  return user;
};
