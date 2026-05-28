import express from "express";
import cors from "cors";
import helmet from "helmet";
import compression from "compression";
import cookieParser from "cookie-parser";
import morgan from "morgan";
import hpp from "hpp";
import rateLimit from "express-rate-limit";

import routes from "./routes/index.js";

import errorMiddleware from "./middlewares/error.middleware.js";
import notFoundMiddleware from "./middlewares/notFound.middleware.js";

const app = express();

// ==============================
// Rate Limiter
// ==============================
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
  message: "Too many requests from this IP",
});

// ==============================
// Security Middlewares
// ==============================

// Security Headers
app.use(helmet());

// Rate Limiting
app.use(limiter);

// Prevent HTTP Parameter Pollution
app.use(hpp());

// Enable CORS
app.use(
  cors({
    origin: "*",
    credentials: true,
  }),
);

// ==============================
// Body Parsers
// ==============================
app.use(express.json());

app.use(
  express.urlencoded({
    extended: true,
  }),
);

// ==============================
// Cookies
// ==============================
app.use(cookieParser());

// ==============================
// Compression
// ==============================
app.use(compression());

// ==============================
// Logger
// ==============================
app.use(morgan("dev"));

// ==============================
// Health Route
// ==============================
app.get("/", (req, res) => {
  res.status(200).json({
    success: true,
    message: "Food Delivery API Running",
  });
});

// ==============================
// API Routes
// ==============================
app.use("/api/v1", routes);

// ==============================
// Not Found Middleware
// ==============================
app.use(notFoundMiddleware);

// ==============================
// Global Error Middleware
// ==============================
app.use(errorMiddleware);

export default app;
