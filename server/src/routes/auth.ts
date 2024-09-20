import { Router } from "express";
import { handleLoginUser, handleSignupUser } from "../controllers/user";

const authRouter = Router();

authRouter.post("/register", handleSignupUser);
authRouter.post("/login", handleLoginUser);

export default authRouter;
