import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
dotenv.config({ path: path.join(__dirname, "../../Config/.env.secrets") });

export const jwtSecret = process.env.JWT_SECRET;
export const jwtUserObject = (user) => {
    return {
        id: user._id,
        name: user.name,
        email: user.email,
        age: user.age,
    }
};