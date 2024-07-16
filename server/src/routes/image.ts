import { Router } from "express";
import upload from "../lib/multerConfig";
import { addImage, getImageById, getImages, handleDeleteImage } from "../controllers/image";

import dotenv from "dotenv";
import { checkToken } from "../middlewares";
dotenv.config();

const imageRouter = Router();

imageRouter.use(checkToken);

imageRouter.get("/", getImages);
imageRouter.post("/", upload.single("image"), addImage);
imageRouter.get("/:public_id", getImageById);
imageRouter.delete("/:public_id", handleDeleteImage);

export default imageRouter;
