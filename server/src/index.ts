import express from "express";
import morgan from "morgan";
import cors from "cors";
import routesHandler from "./routes";
import cookieParser from "cookie-parser";
import prisma from "./client";
import { CLIENT_URL, PORT as PortToRun } from "./lib/constants";

const app = express();
app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    origin: CLIENT_URL,
    credentials: true,
  })
);
app.use(
  morgan(":method :url :status :res[content-length] - :response-time ms")
);
app.use("/", routesHandler);

const PORT = PortToRun || 3000;
app
  .listen(PORT, async () => {
    await prisma.$connect();
    console.log("Database connected");
    console.log("App is running at PORT:", PORT);
  })
  .on("error", (error) => {
    throw new Error(error.message);
  });
