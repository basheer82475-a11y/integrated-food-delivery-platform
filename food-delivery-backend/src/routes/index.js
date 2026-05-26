const express = require("express");

const authRoutes = require("../modules/auth/routes/auth.routes");

const router = express.Router();

/*
|--------------------------------------------------------------------------
| Health Route
|--------------------------------------------------------------------------
*/

router.get("/", (req, res) => {
  res.status(200).json({
    success: true,
    message: "API Working Successfully",
  });
});
router.use("/auth", authRoutes);

/*
|--------------------------------------------------------------------------
| Auth Routes
|--------------------------------------------------------------------------
*/

router.use("/auth", authRoutes);

module.exports = router;
