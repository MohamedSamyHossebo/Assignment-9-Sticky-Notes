import { Router } from "express";
import * as authService from "./Auth.service.js";
const router = Router();

router.post("/signup",authService.createUser)
export default router;