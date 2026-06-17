import asyncHandler from "../utils/asyncHandler.js";

import {
  getAllUsersService,
  getUserByIdService,
  updateUserRoleService,
  updateUserStatusService,
} from "../services/user.service.js";

// ==============================
// Get All Users
// ==============================

export const getAllUsers = asyncHandler(async (req, res) => {
  const users = await getAllUsersService();

  res.status(200).json({
    success: true,
    count: users.length,
    data: users,
  });
});

// ==============================
// Get User By Id
// ==============================

export const getUserById = asyncHandler(async (req, res) => {
  const user = await getUserByIdService(req.params.id);

  res.status(200).json({
    success: true,
    data: user,
  });
});

// ==============================
// Update User Role
// ==============================

export const updateUserRole = asyncHandler(async (req, res) => {
  const user = await updateUserRoleService(
    req.params.id,
    req.body.role,
    req.user._id,
  );

  res.status(200).json({
    success: true,
    message: "User role updated successfully",
    data: user,
  });
});

// ==============================
// Update User Status
// ==============================

export const updateUserStatus = asyncHandler(async (req, res) => {
  const user = await updateUserStatusService(
    req.params.id,
    req.body.isActive,
    req.user._id,
  );

  res.status(200).json({
    success: true,
    message: "User status updated successfully",
    data: user,
  });
});
