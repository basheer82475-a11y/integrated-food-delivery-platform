const express = require("express");

const { registerUser } = require("../controllers/auth.controller");

const router = express.Router();

/*
|--------------------------------------------------------------------------
| Auth Routes
|--------------------------------------------------------------------------
*/

router.post("/register", registerUser);

module.exports = router;
