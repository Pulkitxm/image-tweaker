import { Router } from "express";
import authRouter from "./auth";
import imageRouter from "./image";

const routesHandler= Router();

routesHandler.use('/api/auth', authRouter);
routesHandler.use('/api/image', imageRouter);

export default routesHandler;