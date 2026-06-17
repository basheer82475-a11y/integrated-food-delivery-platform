import express from "express";

import { healthCheck } from "../controllers/health.controller.js";

import authRoutes from "./auth.routes.js";
import restaurantRoutes from "./restaurant.routes.js";
import categoryRoutes from "./category.routes.js";
import menuRoutes from "./menu.routes.js";
import orderRoutes from "./order.routes.js";
import cartRoutes from "./cart.routes.js";
import addressRoutes from "./address.routes.js";
import userRoutes from "./user.routes.js";
const router = express.Router();

router.get("/health", healthCheck);

router.use("/auth", authRoutes);
router.use("/users", userRoutes);
router.use("/restaurants", restaurantRoutes);
router.use("/categories", categoryRoutes);
router.use("/menus", menuRoutes);
router.use("/orders", orderRoutes);
router.use("/cart", cartRoutes);
router.use("/addresses", addressRoutes);
export default router;
