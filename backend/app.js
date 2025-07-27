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

// Middleware for auth routes
app.use("/api/auth",authRoutes);

export default app