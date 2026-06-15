import express from "express";
import { uploadImage } from "../controllers/upload.controller.js";
import upload from "../config/multer.js";
import { protect } from "../middlewares/auth.middleware.js";

const router = express.Router();

// Upload image
router.post("/", protect, upload.single("image"), uploadImage);

export default router;
