import express from "express";
import { AIMessage } from "../controllers/ai.controller.js";

const router = express.Router();

router.post("/", AIMessage);

export default router;
