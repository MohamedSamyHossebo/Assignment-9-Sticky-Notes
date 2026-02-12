import { Router } from "express";
const authRouter = Router();

authRouter.post("/signup", (req, res) => {
    res.status(200).json({ message: "Signup" });
})

export default authRouter;