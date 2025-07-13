import User from "../models/user.model.js";

export const createUser = async (req, res) => {
    try {
        const { name } = req.body;
        if (!name) {
            return res.status(400).json({ message: "Name is required" });
        }
        const existingUser = await User.findOne({ name });
        if (existingUser) {
            return res.status(409).json({ message: "User already exists" });
        }
        const user = new User({ name });
        await user.save();
        return res.status(201).json(user);
    } catch (error) {
        console.log("Error in create user controller", error.message);
        return res.status(500).json({ message: "Internal Server error" });
    }
};

// Get all users (optionally sorted by points)
export const getAllUsers = async (req, res) => {
    try {
        let sort = {};
        if (req.query.sort) {
            if (req.query.sort === "points") {
                sort = { totalPoints: 1 };
            } else if (req.query.sort === "-points") {
                sort = { totalPoints: -1 };
            }
        }
        const users = await User.find().sort(sort);
        return res.status(200).json(users);
    } catch (error) {
        console.log("Error in getAllUsers controller", error.message);
        return res.status(500).json({ message: "Internal Server error" });
    }
};


// (Optional) Get a single user by ID
export const getUserById = async (req, res) => {
    try {
        const { id } = req.params;
        if (!id) {
            return res.status(400).json({ message: "User ID is required" });
        }

        const user = await User.findById(id);
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        return res.status(200).json(user);
    } catch (error) {
        console.log("Error in getUserById controller", error.message);
        return res.status(500).json({ message: "Internal Server error" });
    }
};
