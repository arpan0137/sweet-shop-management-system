import dotenv from 'dotenv';
dotenv.config();
//exporting environment variables
export const env = {
    mongodbURI: process.env.MONGODB_URI,
    port: process.env.PORT,
    jwtSecret: process.env.JWT_TOKEN_SECRET
}