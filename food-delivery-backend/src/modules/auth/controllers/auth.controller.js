import asyncHandler from "../../../utils/asyncHandler.js";

import {
  registerUserService,
  loginUserService,
} from "../services/auth.service.js";

import {
  validateRegisterInput,
  validateLoginInput,
} from "../validators/auth.validation.js";

import sendTokenResponse from "../utils/sendTokenResponse.js";


/*
|--------------------------------------------------------------------------
| Register Controller
|--------------------------------------------------------------------------
*/

const registerUser = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body;

  validateRegisterInput({
    name,
    email,
    password,
  });

  const user = await registerUserService({
    name,
    email,
    password,
  });

  sendTokenResponse(user, 201, res, "User registered successfully");
});

/*
|--------------------------------------------------------------------------
| Login Controller
|--------------------------------------------------------------------------
*/

const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  validateLoginInput({
    email,
    password,
  });

  const user = await loginUserService({
    email,
    password,
  });

  sendTokenResponse(user, 200, res, "Login successful");
});

/*
|--------------------------------------------------------------------------
| Logout Controller
|--------------------------------------------------------------------------
*/

const logoutUser = asyncHandler(async (req, res) => {
  return res.status(200).json({
    success: true,
    message: "Logout successful",
  });
});

export {
  registerUser,
  loginUser,
  logoutUser,
};

