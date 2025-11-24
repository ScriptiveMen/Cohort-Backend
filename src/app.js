import cookieParser from "cookie-parser";
import express from "express";
import authRoutes from "./routes/auth.routes.js";

const app = express();

app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/api/auth", authRoutes);

export default app;
