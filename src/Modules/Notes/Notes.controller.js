import { Router } from "express";
import * as notesService from "./Notes.service.js";
const router = Router();

router.get("/paginate-sort", notesService.paginateSortNotes);
router.post("/", notesService.addNote);
router.patch("/all", notesService.updateAllNotesTitle);
router.patch("/:noteId", notesService.updateSingleNote);
router.put("/replace/:noteId", notesService.replaceNoteDocument);
router.delete("/:noteId", notesService.deleteNote);

export default router;