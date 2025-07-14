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

        //emit event
        const io = req.app.get('io')
        io.emit("userCreated" , user); //brodcast to all client
        
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



