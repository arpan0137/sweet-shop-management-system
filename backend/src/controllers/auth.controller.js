import { User } from "../models/user.model.js";
import bcryptjs from "bcryptjs"
import jwt from "jsonwebtoken"
import { env } from "../../env.js"

export const register = async (req, res) => {
    try {
        const { username, password } = req.body;

        // check for existing user
        const existingUser = await User.findOne({ username });
        if (existingUser) {
            // if user exists prevent registeration
            return res.status(409).json({ error: "User already exists" });
        }

        // creating password hash
        const salt = await bcryptjs.genSalt(10);
        const hashedPassword = await bcryptjs.hash(password, salt);

        // create new user
        const newUser = new User({
            username,
            password: hashedPassword
        });

        // save user to database
        await newUser.save();

        res.status(201).json({ message: "User registered successfully" });

    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Internal server error" });
    }
};


export const login = async (req, res) => {
    try {
        const { username, password } = req.body;

        //Find User by username
        const user = await User.findOne({ username });
        if (!user) {
            return res.status(401).json({ error: "User not found" });
        }

        //check password
        const isMatch = await bcryptjs.compare(password, user.password);
        if (!isMatch) {
            return res.status(401).json({ error: "Invalid Credentials" })
        }

        //Generate a JWT token
        const token = jwt.sign(
            { userId: user._id, role: user.role },
            env.jwtSecret,
            { expiresIn: '1h' }
        );

        return res.status(200).json({ token })

    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Internal server error" });
    }
}