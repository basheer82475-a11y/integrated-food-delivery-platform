import bcrypt from "bcryptjs";

import User from "../models/user.model.js";

import ApiError from "../utils/ApiError.js";

import {
  validateRegisterInput,
  validateLoginInput,
} from "../validators/auth.validator.js";

// ==============================
// Register User Service
// ==============================

export const registerUserService = async ({ name, email, password }) => {
  validateRegisterInput({
    name,
    email,
    password,
  });

  const existingUser = await User.findOne({
    email,
  });

  if (existingUser) {
    throw new ApiError(409, "User already exists");
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const user = await User.create({
    name,
    email,
    password: hashedPassword,
    role: "customer",
  });

  return user;
};

// ==============================
// Login User Service
// ==============================

export const loginUserService = async ({ email, password }) => {
  validateLoginInput({
    email,
    password,
  });

  const user = await User.findOne({
    email,
  }).select("+password");

  if (!user) {
    throw new ApiError(401, "Invalid email or password");
  }

  const isPasswordMatched = await bcrypt.compare(password, user.password);

  if (!isPasswordMatched) {
    throw new ApiError(401, "Invalid email or password");
  }

  return user;
};
