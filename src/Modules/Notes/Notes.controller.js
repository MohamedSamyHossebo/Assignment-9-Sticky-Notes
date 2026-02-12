import { Router } from "express";
import * as notesService from "./Notes.service.js";
const router = Router();

router.post("/", notesService.addNote);
router.patch("/:noteId", notesService.updateSingleNote);

export default router;