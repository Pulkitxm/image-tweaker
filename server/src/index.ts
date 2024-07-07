import express from "express";
import morgan from "morgan";
import cors from "cors";
import routesHandler from "./routes";
import cookieParser from "cookie-parser";

import dotenv from "dotenv";
dotenv.config();

const app = express();
app.use(express.json());
app.use(cookieParser());
app.use(cors());
app.use(
  morgan(":method :url :status :res[content-length] - :response-time ms")
);
app.use("/", routesHandler);

const PORT = process.env.PORT || 3000;
app
  .listen(PORT, () => {
    console.log("App is running at PORT:", PORT);
  })
  .on("error", (error) => {
    throw new Error(error.message);
  });
