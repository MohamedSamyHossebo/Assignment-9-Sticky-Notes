import { Router } from "express";
const userRouter = Router();

userRouter.post("/", (req, res) => {
    res.status(200).json({ message: "User" });
})

export default userRouter;