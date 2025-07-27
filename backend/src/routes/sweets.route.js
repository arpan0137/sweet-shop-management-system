import express from "express";
import * as sweetsController from "../controllers/sweets.controller.js";

const router = express.Router();

router.post("/", sweetsController.addSweet);

export default router;