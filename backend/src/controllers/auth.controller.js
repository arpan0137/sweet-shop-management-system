import { User } from "../models/user.model.js";
import bcryptjs from "bcryptjs"

export const register = async (req, res) => {
    try {
        const { username, password } = req.body;

        // check for existing user
        const existingUser = await User.findOne({ username });
        if(existingUser){
            // if user exists prevent registeration/
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
