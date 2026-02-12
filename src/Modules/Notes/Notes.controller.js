import { Router } from "express";
import * as notesService from "./Notes.service.js";
const router = Router();

router.post("/", notesService.addNote);
router.patch("/all", notesService.updateAllNotesTitle);
router.patch("/:noteId", notesService.updateSingleNote);
router.put("/replace/:noteId", notesService.replaceNoteDocument);

export default router;