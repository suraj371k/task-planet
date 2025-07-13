import ClaimHistory from "../models/claimHistory.model.js";
import User from "../models/user.model.js";



// Claim random points for a user
export const claimPoints = async (req, res) => {
    try {
        const { id } = req.body;
        if (!id) {
            return res.status(400).json({ message: "User ID is required" });
        }

        // Find the user
        const user = await User.findById(id);
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        // Generate random points between 1 and 10
        const points = Math.floor(Math.random() * 10) + 1;

        // Add points to user's totalPoints
        user.totalPoints += points;
        await user.save();

        //create a claim history record
        const claim = new ClaimHistory({
            userId: user._id,
            points: points,
            claimedAt: new Date()
        })

        await claim.save();

        return res.status(200).json({
            message: `Claimed ${points} points successfully!`,
            pointsClaimed: points,
            totalPoints: user.totalPoints,
            user
        });
    } catch (error) {
        console.log("Error in claimPoints controller", error.message);
        return res.status(500).json({ message: "Internal Server error" });
    }
};


export const getAllClaims = async (req, res) => {
    try {
        const claims = await ClaimHistory.find().populate('userId', 'name');
        return res.status(200).json(claims);
    } catch (error) {
        console.error("Error in getAllClaims controller", error.message);
        return res.status(500).json({ message: "Internal Server error" });
    }
};


export const getClaimsByUser = async (req, res) => {
    try {
        const { userId } = req.params;
        if (!userId) {
            return res.status(400).json({ message: "User ID is required" });
        }
        const claims = await ClaimHistory.find({ userId }).populate('userId', 'name');
        return res.status(200).json(claims);
    } catch (error) {
        console.error("Error in getClaimsByUser controller", error.message);
        return res.status(500).json({ message: "Internal Server error" });
    }
}