import { Sweet } from "../models/sweet.model.js";

// Controller to add a new sweet.
// Expects sweet details in the request body.
// Only accessible by admins.

export const addSweet = async (req, res) => {
    try {
        // Create a new Sweet instance with the data from the request body
        const newSweet = new Sweet({
            name: req.body.name,
            category: req.body.category,
            price: req.body.price,
            quantityinstock: req.body.quantityinstock
        });

        // Save the new sweet to the database
        const savedSweet = await newSweet.save();

        // Respond with a 201 Created status and the saved sweet data
        res.status(201).json({ data: savedSweet })
    } catch (error) {
        console.error(error);
        res.status(400).json({ error: error.message })
    }
}

export const getAllSweets = async (req, res) => {
    try {
        const sweets = await Sweet.find({});
        res.status(200).json({ data: sweets });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Server error" });
    }
}

export const searchSweets = async (req, res) => {
    try {
        const { name, category, minPrice, maxPrice } = req.query;

        const query = {};

        if (name) {
            query.name = { $regex: name, $options: 'i' };
        }
        if (category) {
            query.category = category;
        }
        if (minPrice || maxPrice) {
            query.price = {};
            if (minPrice) {
                query.price.$gte = Number(minPrice);
            }
            if (maxPrice) {
                query.price.$lte = Number(maxPrice);
            }
        }

        // Mongoose finds all sweets that match the filter built above
        const sweets = await Sweet.find(query);

        res.status(200).json({ data: sweets });
    } catch (error) {
        res.status(500).json({ error: 'Server error' });
    }
};