import { Router } from "express";
import { handleLoginUser, handleSignupUser } from "../controllers/user";

const authRouter = Router();

authRouter.post("/signup", handleSignupUser);
authRouter.post("/login", handleLoginUser);

export default authRouter;
