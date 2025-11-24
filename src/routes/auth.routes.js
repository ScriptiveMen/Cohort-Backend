import express from "express";
import * as authRoutes from "../controllers/auth.controller.js";

const router = express.Router();

router.post("/register", authRoutes.registerUser);
router.post("/login", authRoutes.loginUser);

export default router;
