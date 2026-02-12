import { Router } from "express";
import * as userService from "./User.service.js";
const router = Router();


router.patch("/", userService.updateLoggedInUser)

export default router;