const express = require("express");

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

module.exports = router;
