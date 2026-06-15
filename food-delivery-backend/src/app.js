import express from "express";
import cors from "cors";
import helmet from "helmet";
import compression from "compression";
import cookieParser from "cookie-parser";
import morgan from "morgan";
import hpp from "hpp";
import rateLimit from "express-rate-limit";
import path from "path";
import { fileURLToPath } from "url";

import routes from "./routes/index.js";

import errorMiddleware from "./middlewares/error.middleware.js";
import notFoundMiddleware from "./middlewares/notFound.middleware.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

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

// Enable CORS - allow multiple frontend ports during development
const corsOptions = {
  origin: (origin, callback) => {
    const allowedOrigins = [
      "http://localhost:5173",
      "http://localhost:5174",
      "http://localhost:5175",
      "http://localhost:3000",
    ];
    
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  credentials: true,
  methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"],
};
app.use(cors(corsOptions));



// ==============================
// Static File Serving
// ==============================
app.use("/uploads", express.static(path.join(__dirname, "../uploads")));

// ==============================
// Body Parsers
// ==============================
app.use(express.json({ limit: "10kb" }));

app.use(
  express.urlencoded({
    extended: true,
    limit: "10kb",
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
