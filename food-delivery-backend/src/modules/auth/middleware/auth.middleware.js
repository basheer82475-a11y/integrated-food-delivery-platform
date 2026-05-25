const jwt = require("jsonwebtoken");

const Auth = require("../models/auth.model");

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
      res.status(401);

      throw new Error("Not authorized");
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    req.user = await Auth.findById(decoded.id).select("-password");

    next();
  } catch (error) {
    next(error);
  }
};

module.exports = {
  protect,
};
