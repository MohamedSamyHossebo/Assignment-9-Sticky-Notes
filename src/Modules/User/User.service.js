import UserModel from "../../DB/Models/Users/Users.model.js";
import jwt from "jsonwebtoken";
import { jwtSecret } from "../../Utils/jwt.util.js";

export const updateLoggedInUser = async (req, res) => {
    try {
        const token = req.headers['authorization'];
        if (!token) {
            return res.status(401).json({ message: "Unauthorized", status: "error" });
        }
        const decodedToken = jwt.verify(token, jwtSecret);

        const user = await UserModel.findById(decodedToken.id);
        if (!user) {
            return res.status(404).json({ message: "User not found", status: "error" });
        }

        if (token !== user.token) {
            return res.status(401).json({ message: "Unauthorized: Invalid token", status: "error" });
        }

        const { name, email, age, phone } = req.body;
        if (!name || !email || !age || !phone) {
            return res.status(400).json({ message: "All fields are required", status: "error" });
        }

        const updatedUser = await UserModel.findByIdAndUpdate(decodedToken.id, req.body, { new: true });
        if (!updatedUser) {
            return res.status(404).json({ message: "User not found", status: "error" });
        }

        return res.status(200).json({ message: "User updated successfully", status: "success", user: { name, email, age, phone } });
    } catch (error) {
        return res.status(500).json({ message: error.message, status: "error", stack: error.stack });
    }
}