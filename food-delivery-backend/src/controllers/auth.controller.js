import jwt from "jsonwebtoken";

import asyncHandler from "../utils/asyncHandler.js";

import {
  registerUserService,
  loginUserService,
} from "../services/auth.service.js";

import generateAccessToken from "../utils/generateAccessToken.js";

import generateRefreshToken from "../utils/generateRefreshToken.js";

import {
  accessTokenCookieOptions,
  refreshTokenCookieOptions,
} from "../utils/cookieOptions.js";

// ==============================
// Register User
// ==============================
export const registerUser = asyncHandler(async (req, res) => {
  const user = await registerUserService(req.body);

  const accessToken = generateAccessToken(user._id);

  const refreshToken = generateRefreshToken(user._id);

  res.cookie("accessToken", accessToken, accessTokenCookieOptions);

  res.cookie("refreshToken", refreshToken, refreshTokenCookieOptions);

  res.status(201).json({
    success: true,
    message: "User registered successfully",

    user: {
      id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
      accessToken,
      refreshToken,
    },
  });
});

// ==============================
// Login User
// ==============================
export const loginUser = asyncHandler(async (req, res) => {
  const user = await loginUserService(req.body);

  const accessToken = generateAccessToken(user._id);

  const refreshToken = generateRefreshToken(user._id);

  res.cookie("accessToken", accessToken, accessTokenCookieOptions);

  res.cookie("refreshToken", refreshToken, refreshTokenCookieOptions);

  res.status(200).json({
    success: true,
    message: "Login successful",

    user: {
      id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
      accessToken,
      refreshToken,
    },
  });
});

// ==============================
// Logout User
// ==============================
export const logoutUser = asyncHandler(async (req, res) => {
  res.clearCookie("accessToken");

  res.clearCookie("refreshToken");

  res.status(200).json({
    success: true,
    message: "Logged out successfully",
  });
});

// ==============================
// Get My Profile
// ==============================
export const getMyProfile = asyncHandler(async (req, res) => {
  res.status(200).json({
    success: true,
    user: req.user,
  });
});

// ==============================
// Refresh Access Token
// ==============================
export const refreshAccessToken = asyncHandler(async (req, res) => {
  const refreshToken = req.cookies.refreshToken || req.body.refreshToken;

  if (!refreshToken) {
    return res.status(401).json({
      success: false,
      message: "Refresh token missing",
    });
  }

  const decoded = jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET);

  const accessToken = generateAccessToken(decoded.id);

  res.cookie("accessToken", accessToken, accessTokenCookieOptions);

  res.status(200).json({
    success: true,
    message: "Access token refreshed",
    accessToken,
  });
});
