import User from "../models/user.model.js";

import ApiError from "../utils/ApiError.js";

import { verifyAccessToken } from "../utils/token.utils.js";

// ==============================
// Protect Middleware
// ==============================

export const protect = async (req, res, next) => {
  try {
    let token = null;

    if (
      req.headers.authorization &&
      req.headers.authorization.startsWith("Bearer ")
    ) {
      token = req.headers.authorization.split(" ")[1];
    }

    if (!token && req.cookies?.accessToken) {
      token = req.cookies.accessToken;
    }

    if (!token) {
      return next(new ApiError(401, "Access denied. Please login"));
    }

    const decoded = verifyAccessToken(token);

    const user = await User.findById(decoded.id).select("-password");

    if (!user) {
      return next(new ApiError(401, "User not found"));
    }

    if (!user.isActive) {
      return next(new ApiError(403, "Account is inactive"));
    }

    req.user = user;

    next();
  } catch {
    return next(new ApiError(401, "Invalid or expired token"));
  }
};

// ==============================
// Role Authorization
// ==============================

export const authorize = (...roles) => {
  return (req, res, next) => {
    if (!req.user) {
      return next(new ApiError(401, "Unauthorized"));
    }

    if (!roles.includes(req.user.role)) {
      return next(
        new ApiError(403, "You are not allowed to access this resource"),
      );
    }

    next();
  };
};
