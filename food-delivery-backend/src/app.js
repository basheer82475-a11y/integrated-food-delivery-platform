const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const morgan = require("morgan");
const cookieParser = require("cookie-parser");

const routes = require("./routes");

const { notFound, errorHandler } = require("./middleware/error.middleware");

const app = express();

/*
|--------------------------------------------------------------------------
| Global Middlewares
|--------------------------------------------------------------------------
*/

app.use(express.json());

app.use(express.urlencoded({ extended: true }));

app.use(cors());

app.use(helmet());

app.use(morgan("dev"));

app.use(cookieParser());

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
*/

app.use("/api/v1", routes);

/*
|--------------------------------------------------------------------------
| Error Middlewares
|--------------------------------------------------------------------------
*/

app.use(notFound);

app.use(errorHandler);

module.exports = app;
