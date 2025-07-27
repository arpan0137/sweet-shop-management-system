import { env } from "../../env";
import mongoose from "mongoose";

const sweetSchema = new mongoose.Schema({
    name: { type: String, required: true, unique: true },
    category: { type: String, required: true },
    price: { type: Number, required: true },
    quantityinstock: { type: Number, required: true },
})

export const Sweet = mongoose.models?.sweets || mongoose.model('sweets', sweetSchema)