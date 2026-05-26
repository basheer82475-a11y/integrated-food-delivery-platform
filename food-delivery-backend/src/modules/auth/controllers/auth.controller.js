const asyncHandler = require("../../../utils/asyncHandler");

const {
  registerUserService,
  loginUserService,
} = require("../services/auth.service");

const {
  validateRegisterInput,
  validateLoginInput,
} = require("../validators/auth.validation");

const sendTokenResponse = require("../utils/sendTokenResponse");

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

module.exports = {
  registerUser,
  loginUser,
  logoutUser,
};
