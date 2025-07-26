// In backend/app.js
import express from "express";
const app = express();

// A simple route to test the server
app.get('/', (req, res) => {
    res.send('Backend server is running!');
});

export default app