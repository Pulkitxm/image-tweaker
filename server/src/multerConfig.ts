import { NextFunction, Request, Response } from "express";
import multer from "multer";
import fs from "fs";
import path from "path";
import { v4 as uuid } from "uuid";

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const filePath = path.join(__dirname, "..", "..", "images");
    console.log(filePath);

    if (!fs.existsSync(filePath)) {
      fs.mkdirSync(filePath, { recursive: true });
    } else {
      // show contenst of folder
      const files = fs.readdirSync(filePath);
      console.log(files);
    }
    cb(null, filePath);
  },
  filename: (req, file, cb) => {
    const fileName =
      file.originalname + "-" + uuid() + path.extname(file.originalname);
    cb(null, fileName);
  },
});

const upload = multer({ storage: storage });

export async function handleMulterErrors(
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
) {
  console.log("multer error", err);

  if (err instanceof multer.MulterError) {
    return res.status(400).json({ message: err.message });
  } else if (err) {
    return res.status(500).json({ message: err.message });
  }
  next();
}

export default upload;
