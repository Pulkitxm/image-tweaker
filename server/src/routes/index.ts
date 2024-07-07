import { Router } from "express";
import authRouter from "./auth";

const routesHandler= Router();

routesHandler.use('/api/auth', authRouter);

export default routesHandler;