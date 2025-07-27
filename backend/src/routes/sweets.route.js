import express from "express";
import * as sweetsController from "../controllers/sweets.controller.js";
import { protect, admin } from "../middleware/auth.middleware.js";

const router = express.Router();

// only logged in users can view sweets
router.get('/', protect, sweetsController.getAllSweets)

// Route to add a new sweet.
// It is protected by two middleware functions:
// 1. `protect`: Ensures the user is logged in.
// 2. `admin`: Ensures the logged-in user has an 'admin' role.
router.post("/", protect, admin, sweetsController.addSweet);

export default router;