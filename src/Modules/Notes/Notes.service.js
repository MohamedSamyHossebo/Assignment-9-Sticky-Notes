import NoteModel from "../../DB/Models/Notes/Notes.model.js"
import UserModel from "../../DB/Models/Users/Users.model.js";
import jwt from "jsonwebtoken";
import { jwtSecret } from "../../Utils/jwt.util.js";

export const addNote = async (req, res) => {
    try {
        const token = req.headers['authorization'];
        if (!token) return res.status(401).json({ message: "Unauthorized", status: "error" })
        const decodedToken = jwt.verify(token, jwtSecret);
        const user = await UserModel.findById(decodedToken.id);
        if (!user) return res.status(404).json({ message: "User Not Found ", status: "error" });
        if (token !== user.token) return res.status(401).json({ message: "Unauthorized: Invalid token", status: "error" });
        const { title, content } = req.body;
        if (!title || !content) return res.status(400).json({ message: "All fields are required", status: "error" });
        const note = await NoteModel.create({ title, content, userId: decodedToken.id });
        return res.status(201).json({ message: "Note Created successfully", status: "success" });
    } catch (error) {
        return res.status(500).json({ message: error.message, status: "error", stack: error.stack });
    }
}

export const updateSingleNote = async (req, res) => {
    try {
        const token = req.headers['authorization'];
        if (!token) return res.status(401).json({ message: "Unauthorized", status: "error" })
        const decodedToken = jwt.verify(token, jwtSecret);
        const user = await UserModel.findById(decodedToken.id);
        if (!user) return res.status(404).json({ message: "User Not Found ", status: "error" });
        if (token !== user.token) return res.status(401).json({ message: "Unauthorized: Invalid token", status: "error" });
        const { title, content } = req.body;
        if (!title || !content) {
            return res.status(400).json({ message: "All fields are required", status: "error" });
        }
        const { id } = req.params;
        const note = await NoteModel.findByIdAndUpdate(id, { title, content }, { returnDocument: 'after' });
        if (!note) return res.status(404).json({ message: "Note not found", status: "error" });

        return res.status(200).json({ message: "Note Updated successfully", status: "success", note });
    } catch (error) {
        return res.status(500).json({ message: error.message, status: "error", stack: error.stack });
    }
}