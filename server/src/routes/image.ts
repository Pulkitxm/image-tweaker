import { Router } from "express";
import upload from "../lib/multerConfig";
import { addImage, getImageById, getImages } from "../controllers/image";

import dotenv from "dotenv";
import { checkToken } from "../middlewares";
dotenv.config();

const imageRouter = Router();

imageRouter.use(checkToken);

imageRouter.get("/", getImages);
imageRouter.post("/", upload.single("test"), addImage);
imageRouter.get("/:public_id", getImageById);

export default imageRouter;
