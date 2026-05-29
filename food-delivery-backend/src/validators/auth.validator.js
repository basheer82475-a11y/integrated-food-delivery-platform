import validator from "validator";

import ApiError from "../utils/ApiError.js";

// ==============================
// Allowed Roles
// ==============================

const allowedRoles = ["customer", "restaurant_owner", "admin"];

// ==============================
// Validate Register Input
// ==============================

export const validateRegisterInput = ({ name, email, password, role }) => {
  // Required Fields

  if (!name || !email || !password) {
    throw new ApiError(400, "All fields are required");
  }

  // Name Validation

  if (name.trim().length < 2) {
    throw new ApiError(400, "Name must be at least 2 characters");
  }

  // Email Validation

  if (
    !validator.isEmail(email, {
      allow_utf8_local_part: false,
      require_tld: true,
    })
  ) {
    throw new ApiError(400, "Please provide a valid email address");
  }

  // Password Validation

  if (
    !validator.isStrongPassword(password, {
      minLength: 6,
      minLowercase: 1,
      minUppercase: 1,
      minNumbers: 1,
      minSymbols: 0,
    })
  ) {
    throw new ApiError(
      400,
      "Password must contain uppercase, lowercase and number",
    );
  }

  // Role Validation

  if (role && !allowedRoles.includes(role)) {
    throw new ApiError(400, "Invalid role selected");
  }
};

// ==============================
// Validate Login Input
// ==============================

export const validateLoginInput = ({ email, password }) => {
  if (!email || !password) {
    throw new ApiError(400, "Email and password are required");
  }

  if (
    !validator.isEmail(email, {
      allow_utf8_local_part: false,
      require_tld: true,
    })
  ) {
    throw new ApiError(400, "Invalid email address");
  }
};
