import express from "express";
import * as sweetsController from "../controllers/sweets.controller.js";
import { protect, admin } from "../middleware/auth.middleware.js";

const router = express.Router();

// Route to get all sweets
router.get('/', protect, sweetsController.getAllSweets)

// Route to search for sweets
router.get('/search', protect, sweetsController.searchSweets)

// Route to update sweets
router.put('/:id', protect, admin, sweetsController.updateSweet);

//Route to delete sweets
router.delete('/:id', protect, admin, sweetsController.deleteSweet);

// Route to purchase a sweet
router.post('/:id/purchase', protect, sweetsController.purchaseSweet);

// Route to add a new sweet.
// It is protected by two middleware functions:
// 1. `protect`: Ensures the user is logged in.
// 2. `admin`: Ensures the logged-in user has an 'admin' role.
router.post("/", protect, admin, sweetsController.addSweet);

export default router;