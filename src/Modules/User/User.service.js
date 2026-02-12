import UserModel from "../../DB/Models/Users/Users.model.js";
import jwt from "jsonwebtoken";
import { jwtSecret } from "../../Utils/jwt.util.js";
import crypto from "crypto";

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
        const encryptedPhone = crypto.createHash("sha256").update(phone).digest("hex");
        const updatedUser = await UserModel.findByIdAndUpdate(decodedToken.id, { name, email, age, phone: encryptedPhone }, {
            returnDocument: 'after'
        });
        if (!updatedUser) {
            return res.status(404).json({ message: "User not found", status: "error" });
        }

        return res.status(200).json({ message: "User updated successfully", status: "success" });
    } catch (error) {
        return res.status(500).json({ message: error.message, status: "error", stack: error.stack });
    }
}
export const deleteLoggedInUser = async (req, res) => {
    try {
        const token = req.headers['authorization'];
        if (!token) return res.status(401).json({ message: "Unauthorized", status: "error" })
        const decodedToken = jwt.verify(token, jwtSecret);
        const user = await UserModel.findById(decodedToken.id);
        if (!user) return res.status(404).json({ message: "User Not Found ", status: "error" });
        if (token !== user.token) return res.status(401).json({ message: "Unauthorized: Invalid token", status: "error" });
        const deletedUser = await UserModel.findByIdAndDelete(decodedToken.id);
        if (!deletedUser) return res.status(404).json({ message: "User Not Found ", status: "error" });
        return res.status(200).json({ message: "User deleted successfully", status: "success" });

    } catch (error) {
        return res.status(500).json({ message: error.message, status: "error", stack: error.stack });
    }
}
export const getLoggedInUser = async (req, res) => {
    try {
        const token = req.headers['authorization'];
        if (!token) return res.status(401).json({ message: "Unauthorized", status: "error" })
        const decodedToken = jwt.verify(token, jwtSecret);
        const user = await UserModel.findById(decodedToken.id);
        if (!user) return res.status(404).json({ message: "User Not Found ", status: "error" });
        if (token !== user.token) return res.status(401).json({ message: "Unauthorized: Invalid token", status: "error" });
        return res.status(200).json({ message: "User fetched successfully", status: "success", user });
    } catch (error) {
        return res.status(500).json({ message: error.message, status: "error", stack: error.stack });
    }
}