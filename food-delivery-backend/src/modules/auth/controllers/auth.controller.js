const asyncHandler = require("../../../utils/asyncHandler");
const ApiError = require("../../../utils/apiError");
const apiResponse = require("../../../utils/apiResponse");
const {
  registerUserService,
  loginUserService,
} = require("../services/auth.service");

const {
  validateRegisterInput,
  validateLoginInput,
} = require("../validators/auth.validation");

const generateToken = require("../utils/generateToken");

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

  const token = generateToken(user._id);
  return apiResponse(res, 201, true, "User registered successfully", {
    token,
    user: {
      id: user._id,
      name: user.name,
      email: user.email,
    },
  });
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

  const token = generateToken(user._id);

  return apiResponse(res, 200, true, "Login successful", {
    token,
    user: {
      id: user._id,
      name: user.name,
      email: user.email,
    },
  });
});

module.exports = {
  registerUser,
  loginUser,
};
