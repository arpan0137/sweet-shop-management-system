// In backend/app.js
import express from "express";
const app = express();

// Middleware to parse JSON bodies
app.use(express.json());

// A simple route to test the server
app.get('/', (req, res) => {
    res.send('Backend server is running!');
});

// route for user registration
app.post('/api/auth/register',(req,res) => {
    res.status(201).json({message: "User registerd successfully"});
});

export default app