import express, { Request, Response } from "express";
import morgan from "morgan";
import cors from "cors";

import dotenv from "dotenv";
import imageRouter from "./routes/image";
dotenv.config();

const app = express();
app.use(express.json());
app.use(cors());
app.use(morgan(':method :url :status :res[content-length] - :response-time ms'));

app.use('/api/image', imageRouter);

app.get("/", (request: Request, response: Response) => {
    response.status(200).send("Hello World");
});

const PORT = process.env.PORT;
app.listen(PORT, () => {
    console.log("App is running at PORT:", PORT);
}).on("error", (error) => {
    throw new Error(error.message);
});