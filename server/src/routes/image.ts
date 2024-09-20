import { Router } from "express";
import upload, { handleMulterErrors } from "../multerConfig";
import {
  addImage,
  getImageById,
  getImages,
  handleChangeImagePrivacy,
  handleDeleteImage,
  handleGetImagePrivacyStatus,
} from "../controllers/image";

import dotenv from "dotenv";
import { checkToken } from "../middlewares";
import rateLimit from "express-rate-limit";
dotenv.config();

const imageRouter = Router();

const imageRateLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 30,
  standardHeaders: true,
  legacyHeaders: false,
  message: "Too many requests, please try again later.",
});

imageRouter.get("/:public_id", getImageById);

imageRouter.use(checkToken);
imageRouter.use(imageRateLimiter);

imageRouter.get("/", getImages);
imageRouter.post("/", upload.single("image"), handleMulterErrors, addImage);
imageRouter.delete("/:public_id", handleDeleteImage);
imageRouter.get("/privacy/:public_id", handleGetImagePrivacyStatus);
imageRouter.patch("/privacy/:public_id", handleChangeImagePrivacy);

export default imageRouter;
