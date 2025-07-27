import app from "./app.js";
import mongoose from "mongoose";
import { env } from "./env.js";

const PORT = env.port || 3001;
const DATABASE_URI = env.mongodbURI

mongoose.connect(DATABASE_URI).then(() => {
    app.listen(PORT, () => {
        console.log(`Server is listening on port http://localhost:${PORT}`);
    });
}).catch(err => {
    console.error('Database connection error:', err);
});