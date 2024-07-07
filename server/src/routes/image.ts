import { Router } from "express";
import upload from "../lib/multerConfig";
import { addImage, getImageById } from "../controllers/image";

import dotenv from "dotenv";
dotenv.config();

const imageRouter = Router();

imageRouter.post("/", upload.single("test"), addImage);
imageRouter.get("/:public_id", getImageById);

export default imageRouter;
