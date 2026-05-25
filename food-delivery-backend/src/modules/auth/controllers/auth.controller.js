const {
  registerUserService,
  loginUserService,
} = require("../services/auth.service");

const generateToken = require("../utils/generateToken");

/*
|--------------------------------------------------------------------------
| Register Controller
|--------------------------------------------------------------------------
*/

const registerUser = async (req, res, next) => {
  try {
    const { name, email, password } = req.body;

    const user = await registerUserService({
      name,
      email,
      password,
    });

    const token = generateToken(user._id);

    res.status(201).json({
      success: true,
      message: "User registered successfully",
      token,
      data: {
        id: user._id,
        name: user.name,
        email: user.email,
      },
    });
  } catch (error) {
    next(error);
  }
};

/*
|--------------------------------------------------------------------------
| Login Controller
|--------------------------------------------------------------------------
*/

const loginUser = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    const user = await loginUserService({
      email,
      password,
    });

    const token = generateToken(user._id);

    res.status(200).json({
      success: true,
      message: "Login successful",
      token,
      data: {
        id: user._id,
        name: user.name,
        email: user.email,
      },
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  registerUser,
  loginUser,
};
