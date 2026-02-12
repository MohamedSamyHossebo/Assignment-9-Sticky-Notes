import { Router } from "express";
const notesRouter = Router();

notesRouter.post("/", (req, res) => {
    res.status(200).json({ message: "Notes" });
})

export default notesRouter;