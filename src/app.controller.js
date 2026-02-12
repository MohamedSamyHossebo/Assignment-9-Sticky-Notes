import { authRouter } from "./Modules/index.js";
import { notesRouter } from "./Modules/index.js";
import { userRouter } from "./Modules/index.js";

const bootstrap = (app, express) => {
    app.use(express.json());
    app.use("/api/auth", authRouter);
    app.use("/api/notes", notesRouter);
    app.use("/api/user", userRouter);


    app.get("/", (req, res) => {
        res.status(200).json({ message: "Welcome to the API", status: "success" });
    })
    app.all("/*dummy", (req, res) => {
        res.status(404).json({ message: "Route Not Found", status: "error" });
    })
}

export default bootstrap;