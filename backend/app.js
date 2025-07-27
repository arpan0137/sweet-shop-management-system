// In backend/app.js
import express from "express";
import authRoutes from "./src/routes/auth.routes.js";
import { protect } from "./src/middleware/auth.middleware.js";
const app = express();

// Middleware to parse JSON bodies
app.use(express.json());

// Middleware for auth routes
app.use("/api/auth", authRoutes);

app.get('/api/protected-test', protect, (req, res) => {
    res.status(200).json({ message: "You have access" });
});

export default app