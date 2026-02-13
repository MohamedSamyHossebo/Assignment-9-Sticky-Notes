import NoteModel from "../../DB/Models/Notes/Notes.model.js"
import UserModel from "../../DB/Models/Users/Users.model.js";
import jwt from "jsonwebtoken";
import { jwtSecret } from "../../Utils/jwt.util.js";
import mongoose from "mongoose";

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
        const { noteId } = req.params;
        const noteOwner = await NoteModel.findById(noteId);
        if (!noteOwner) return res.status(404).json({ message: "Note not found", status: "error" });
        if (noteOwner.userId.toString() !== decodedToken.id) return res.status(401).json({ message: "Unauthorized: Invalid token", status: "error", });
        const note = await NoteModel.findByIdAndUpdate(noteId, { title, content }, { returnDocument: 'after' });
        if (!note) return res.status(404).json({ message: "Note not found", status: "error" });

        return res.status(200).json({ message: "Note Updated successfully", status: "success", note });
    } catch (error) {
        return res.status(500).json({ message: error.message, status: "error", stack: error.stack });
    }
}
export const replaceNoteDocument = async (req, res) => {
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
        const { noteId } = req.params;
        const noteOwner = await NoteModel.findById(noteId);
        if (!noteOwner) return res.status(404).json({ message: "Note not found", status: "error" });
        if (noteOwner.userId.toString() !== decodedToken.id) return res.status(401).json({ message: "Unauthorized: Invalid token", status: "error", });
        const note = await NoteModel.findByIdAndUpdate(noteId, { title, content }, { returnDocument: 'after' });
        if (!note) return res.status(404).json({ message: "Note not found", status: "error" });

        return res.status(200).json({ message: "Note Updated successfully", status: "success", note });
    } catch (error) {
        return res.status(500).json({ message: error.message, status: "error", stack: error.stack });
    }
}
export const updateAllNotesTitle = async (req, res) => {
    try {
        const token = req.headers['authorization'];
        if (!token) return res.status(401).json({ message: "Unauthorized", status: "error" })
        const decodedToken = jwt.verify(token, jwtSecret);
        const user = await UserModel.findById(decodedToken.id);
        if (!user) return res.status(404).json({ message: "User Not Found ", status: "error" });
        if (token !== user.token) return res.status(401).json({ message: "Unauthorized: Invalid token", status: "error" });

        const { title } = req.body;
        if (!title) {
            return res.status(400).json({ message: "title is required", status: "error" });
        }
        const note = await NoteModel.updateMany({ userId: decodedToken.id }, { title });
        if (!note) return res.status(404).json({ message: "Note not found", status: "error" });
        const notes = await NoteModel.find({ userId: decodedToken.id });

        return res.status(200).json({ message: "Note Updated successfully", status: "success", notes });
    } catch (error) {
        return res.status(500).json({ message: error.message, status: "error", stack: error.stack });
    }
}
export const deleteNote = async (req, res) => {
    try {
        const token = req.headers['authorization'];
        if (!token) return res.status(401).json({ message: "Unauthorized", status: "error" })
        const decodedToken = jwt.verify(token, jwtSecret);
        const user = await UserModel.findById(decodedToken.id);
        if (!user) return res.status(404).json({ message: "User Not Found ", status: "error" });
        if (token !== user.token) return res.status(401).json({ message: "Unauthorized: Invalid token", status: "error" });

        const { noteId } = req.params;
        const noteOwner = await NoteModel.findById(noteId);
        if (!noteOwner) return res.status(404).json({ message: "Note not found", status: "error" });
        if (noteOwner.userId.toString() !== decodedToken.id) return res.status(401).json({ message: "Unauthorized: Invalid token", status: "error", });
        const note = await NoteModel.findByIdAndDelete(noteId);
        if (!note) return res.status(404).json({ message: "Note not found", status: "error" });

        return res.status(200).json({ message: "Note Deleted successfully", status: "success", note });
    } catch (error) {
        return res.status(500).json({ message: error.message, status: "error", stack: error.stack });
    }
}
export const paginateSortNotes = async (req, res) => {
    try {
        const token = req.headers['authorization'];
        if (!token) return res.status(401).json({ message: "Unauthorized", status: "error" })
        const decodedToken = jwt.verify(token, jwtSecret);
        const user = await UserModel.findById(decodedToken.id);
        if (!user) return res.status(404).json({ message: "User Not Found ", status: "error" });
        if (token !== user.token) return res.status(401).json({ message: "Unauthorized: Invalid token", status: "error" });

        let { page, limit } = req.query;
        page = parseInt(page) || 1;
        limit = parseInt(limit) || 10;
        if (page < 1) page = 1;
        if (limit < 1) limit = 10;

        const query = { userId: decodedToken.id };
        let sortOption = { createdAt: -1 };
        const notes = await NoteModel.find(query)
            .sort(sortOption)
            .skip((page - 1) * limit)
            .limit(limit);
        const totalNotes = await NoteModel.countDocuments(query);
        const totalPages = Math.ceil(totalNotes / limit);

        return res.status(200).json({
            message: "Notes fetched successfully",
            status: "success",
            notes,
            pagination: {
                totalNotes,
                totalPages,
                currentPage: page,
                itemsPerPage: limit
            }
        });
    } catch (error) {
        return res.status(500).json({ message: error.message, status: "error", stack: error.stack });
    }
}
export const getNoteById = async (req, res) => {
    try {
        const token = req.headers['authorization'];
        if (!token) return res.status(401).json({ message: "Unauthorized", status: "error" })
        const decodedToken = jwt.verify(token, jwtSecret);
        const user = await UserModel.findById(decodedToken.id);
        if (!user) return res.status(404).json({ message: "User Not Found ", status: "error" });
        if (token !== user.token) return res.status(401).json({ message: "Unauthorized: Invalid token", status: "error" });

        const { noteId } = req.params;
        const noteOwner = await NoteModel.findById(noteId);
        if (!noteOwner) return res.status(404).json({ message: "Note not found", status: "error" });
        if (noteOwner.userId.toString() !== decodedToken.id) return res.status(401).json({ message: "Unauthorized: Invalid token", status: "error", });
        const note = await NoteModel.findById(noteId);
        if (!note) return res.status(404).json({ message: "Note not found", status: "error" });

        return res.status(200).json({ message: "Note fetched successfully", status: "success", note });
    } catch (error) {
        return res.status(500).json({ message: error.message, status: "error", stack: error.stack });
    }
}
export const getNoteByContent = async (req, res) => {
    try {
        const token = req.headers['authorization'];
        if (!token) return res.status(401).json({ message: "Unauthorized", status: "error" })
        const decodedToken = jwt.verify(token, jwtSecret);
        const user = await UserModel.findById(decodedToken.id);
        if (!user) return res.status(404).json({ message: "User Not Found ", status: "error" });
        if (token !== user.token) return res.status(401).json({ message: "Unauthorized: Invalid token", status: "error" });

        const { content } = req.query;
        if (!content) return res.status(400).json({ message: "content query parameter is required", status: "error" });

        const notes = await NoteModel.findOne({
            content: { $regex: content },
            userId: decodedToken.id
        });
        if (notes.length === 0) return res.status(404).json({ message: "You don't have any note with this content", status: "error" });

        return res.status(200).json({ message: "Notes fetched successfully", status: "success", notes });
    } catch (error) {
        return res.status(500).json({ message: error.message, status: "error", stack: error.stack });
    }
}
export const getAllNotes = async (req, res) => {
    try {
        const token = req.headers['authorization'];
        if (!token) return res.status(401).json({ message: "Unauthorized", status: "error" })
        const decodedToken = jwt.verify(token, jwtSecret);
        const user = await UserModel.findById(decodedToken.id);
        if (!user) return res.status(404).json({ message: "User Not Found ", status: "error" });
        if (token !== user.token) return res.status(401).json({ message: "Unauthorized: Invalid token", status: "error" });

        const notes = await NoteModel.find({ userId: decodedToken.id })
            .select("title userId createdAt")
            .populate("userId", "email");

        if (!notes) return res.status(404).json({ message: "Notes not found", status: "error" });

        return res.status(200).json({ message: "Notes fetched successfully", status: "success", notes });
    } catch (error) {
        return res.status(500).json({ message: error.message, status: "error", stack: error.stack });
    }
}
export const aggregateNotes = async (req, res) => {
    try {
        const token = req.headers['authorization'];
        if (!token) return res.status(401).json({ message: "Unauthorized", status: "error" })
        const decodedToken = jwt.verify(token, jwtSecret);
        const user = await UserModel.findById(decodedToken.id);
        if (!user) return res.status(404).json({ message: "User Not Found ", status: "error" });
        if (token !== user.token) return res.status(401).json({ message: "Unauthorized: Invalid token", status: "error" });

        const { title } = req.query;

        const matchStage = {
            userId: new mongoose.Types.ObjectId(decodedToken.id)
        };

        if (title) {
            matchStage.title = { $regex: title, $options: "i" };
        }

        const notes = await NoteModel.aggregate([
            {
                $match: matchStage
            },
            {
                $lookup: {
                    from: "users",
                    localField: "userId",
                    foreignField: "_id",
                    as: "user"
                }
            },
            {
                $unwind: "$user"
            },
            {
                $project: {
                    title: 1,
                    userId: 1,
                    createdAt: 1,
                    "user.name": 1,
                    "user.email": 1
                }
            }
        ]);

        if (!notes || notes.length === 0) return res.status(404).json({ message: "Notes not found", status: "error" });

        return res.status(200).json({ message: "Notes fetched successfully", status: "success", notes });
    } catch (error) {
        return res.status(500).json({ message: error.message, status: "error", stack: error.stack });
    }
}
export const deleteAllNotes = async (req, res) => {
    try {
        const token = req.headers['authorization'];
        if (!token) return res.status(401).json({ message: "Unauthorized", status: "error" })
        const decodedToken = jwt.verify(token, jwtSecret);
        const user = await UserModel.findById(decodedToken.id);
        if (!user) return res.status(404).json({ message: "User Not Found ", status: "error" });
        if (token !== user.token) return res.status(401).json({ message: "Unauthorized: Invalid token", status: "error" });

        const deleteResult = await NoteModel.deleteMany({ userId: decodedToken.id });

        if (deleteResult.deletedCount === 0) {
            return res.status(404).json({ message: "No notes found to delete", status: "error" });
        }

        return res.status(200).json({ message: "All notes deleted successfully", status: "success", deletedCount: deleteResult.deletedCount });
    } catch (error) {
        return res.status(500).json({ message: error.message, status: "error", stack: error.stack });
    }
}