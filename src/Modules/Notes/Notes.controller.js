import { Router } from "express";
import * as notesService from "./Notes.service.js";
const router = Router();

// Specific GET routes first
router.get("/aggregate", notesService.aggregateNotes);
router.get("/note-with-user", notesService.getAllNotes);
router.get("/paginate-sort", notesService.paginateSortNotes);
router.get("/note-by-content", notesService.getNoteByContent);
router.get("/:noteId", notesService.getNoteById);

router.post("/", notesService.addNote);
router.patch("/all", notesService.updateAllNotesTitle);
router.patch("/:noteId", notesService.updateSingleNote);
router.put("/replace/:noteId", notesService.replaceNoteDocument);
// Specific routes first
router.delete("/", notesService.deleteAllNotes);
router.delete("/:noteId", notesService.deleteNote);

export default router;