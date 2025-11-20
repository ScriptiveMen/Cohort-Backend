import express from "express";
import aiRoutes from "./routes/ai.routes.js";

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/api/ai", aiRoutes);

export default app;
