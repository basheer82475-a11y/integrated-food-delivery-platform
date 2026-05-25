const jwt = require("jsonwebtoken");

const Auth = require("../models/auth.model");

const ApiError = require("../../../utils/apiError");

/*
|--------------------------------------------------------------------------
| Protect Middleware
|--------------------------------------------------------------------------
*/

const protect = async (req, res, next) => {
  try {
    let token;

    if (
      req.headers.authorization &&
      req.headers.authorization.startsWith("Bearer")
    ) {
      token = req.headers.authorization.split(" ")[1];
    }

    if (!token) {
      return next(new ApiError(401, "Not authorized"));
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    req.user = await Auth.findById(decoded.id).select("-password");

    next();
  } catch (error) {
    next(error);
  }
};

/*
|--------------------------------------------------------------------------
| Role Authorization Middleware
|--------------------------------------------------------------------------
*/

const authorizeRoles = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return next(new ApiError(403, "Access denied"));
    }

    next();
  };
};

module.exports = {
  protect,
  authorizeRoles,
};
