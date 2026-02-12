import { Router } from "express";
import * as userService from "./User.service.js";
const router = Router();


router.patch("/", userService.updateLoggedInUser)
router.delete("/", userService.deleteLoggedInUser)

export default router;