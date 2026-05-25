const express = require("express");

const { registerUser, loginUser } = require("../controllers/auth.controller");

const { protect, authorizeRoles } = require("../middleware/auth.middleware");

const router = express.Router();

/*
|--------------------------------------------------------------------------
| Public Routes
|--------------------------------------------------------------------------
*/

router.post("/register", registerUser);

router.post("/login", loginUser);

/*
|--------------------------------------------------------------------------
| Protected Routes
|--------------------------------------------------------------------------
*/

router.get("/me", protect, (req, res) => {
  res.status(200).json({
    success: true,
    user: req.user,
  });
});

/*
|--------------------------------------------------------------------------
| Admin Route
|--------------------------------------------------------------------------
*/

router.get("/admin", protect, authorizeRoles("admin"), (req, res) => {
  res.status(200).json({
    success: true,
    message: "Welcome Admin",
  });
});

module.exports = router;
