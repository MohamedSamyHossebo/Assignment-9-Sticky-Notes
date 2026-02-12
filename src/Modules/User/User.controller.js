import { Router } from "express";
import * as userService from "./User.service.js";
const router = Router();


router.patch("/", userService.updateLoggedInUser)
router.delete("/", userService.deleteLoggedInUser)
router.get("/", userService.getLoggedInUser)

export default router;