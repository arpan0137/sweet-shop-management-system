import jwt from "jsonwebtoken";
import { env } from "../../env";

export const protect = (req, res, next) => {
    let token;
    if (req.headers.authorization?.startsWith('Bearer')) {
        try {
            // Get Token from header
            token = req.headers.authorization.split(' ')[1];

            // Verify Token
            const decoded = jwt.verify(token, env.jwtSecret);

            // Attach user to the request
            req.user = decoded;
            next();
        } catch (error) {
            res.status(401).json({ error: "Not Authorized, token failed" });
        }
    }

    if (!token) {
        res.status(401).json({ error: "Not Authorized, no token" });
    }
}