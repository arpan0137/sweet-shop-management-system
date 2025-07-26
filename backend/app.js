// In backend/app.js
import express from "express";
const app = express();
import authRoutes from "./src/routes/auth.routes";

// Middleware to parse JSON bodies
app.use(express.json());

// A simple route to test the server
app.get('/', (req, res) => {
    res.send('Backend server is running!');
});

// Use auth routes for any requests to /api/auth
app.use("/api/auth",authRoutes);

export default app