import { Router } from "express";
import { handleLoginUser, handleSignupUser } from "../controllers/user";
import rateLimit from "express-rate-limit";

const authRouter = Router();

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 5,
  standardHeaders: true,
  legacyHeaders: false,
  message: "Too many requests, please try again later.",
});

authRouter.use(limiter);

authRouter.post("/register", handleSignupUser);
authRouter.post("/login", handleLoginUser);

export default authRouter;