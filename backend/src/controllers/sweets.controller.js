import { Sweet } from "../models/sweet.model.js";

export const addSweet = async (req, res) => {
    try {
        const newSweet = new Sweet(req.body);
        const savedSweet = await newSweet.save();
        res.status(201).json({ data: savedSweet })
    } catch (error) {
        console.error(error);
        res.status(400).json({ error: error.message })
    }
}