// routes/imageRouter.ts
import { Router } from "express";
import upload from "../lib/multerConfig";
import { v2 as cloudinary, UploadApiResponse } from "cloudinary";
import dotenv from "dotenv";
import axios from "axios";
import { handleManipulateImage } from "../lib/image";

dotenv.config();

const imageRouter = Router();

const store: {
  public_id: string;
  secure_url: string;
}[] = [
  {
    public_id: "ra4ldxqnymcfu0k1hepq",
    secure_url:
      "https://res.cloudinary.com/de43ndsip/image/upload/v1720202973/ra4ldxqnymcfu0k1hepq.jpg",
  },
];

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

imageRouter.post("/", upload.single("test"), async (request, response) => {
  try {
    if (!request.file) {
      return response.status(400).json({ message: "No file uploaded" });
    }

    const uploadStream = cloudinary.uploader.upload_stream(
      (error, result: UploadApiResponse | undefined) => {
        if (error) {
          response.status(500).json({ message: error.message });
        } else {
          if (result) {
            const public_id = result.public_id;
            store.push({ public_id, secure_url: result.secure_url });
            response
              .status(200)
              .json({ message: "Upload successful", public_id, result, store });
          } else {
            response
              .status(500)
              .json({ message: "Upload result is undefined" });
          }
        }
      }
    );
    uploadStream.end(request.file.buffer);
  } catch (error) {
    response.status(500).json({ message: (error as Error).message });
  }
});

imageRouter.get("/:public_id", async (request, response) => {
  try {
    const { public_id } = request.params;
    const searchParams = request.query;
    // const selectedImg = store.find((image) => image.public_id === public_id);
    // if (!selectedImg) {
    //     return response.status(404).json({ message: 'Image not found' });
    // }
    // const imageUrl = selectedImg.secure_url;
    const imageUrl = store.find(
      (image) => image.public_id === public_id
    )?.secure_url;
    if (!imageUrl) {
      return response.status(404).json({ message: "Image not found" });
    }
    const imageResponse = await axios.get(imageUrl, {
      responseType: "arraybuffer",
    });
    const manipulatedImage = await handleManipulateImage(
      imageResponse.data,
      searchParams
    );
    if (!manipulatedImage) {
      return response
        .status(500)
        .json({ message: "Failed to manipulate image" });
    }
    const buffer = await manipulatedImage.getBufferAsync(
      manipulatedImage.getMIME()
    );
    response.writeHead(200, {
      "Content-Type": manipulatedImage.getMIME(),
      "Content-Length": buffer.length,
    });
    response.end(buffer);
  } catch (error) {
    response.status(500).json({ error });
  }
});

export default imageRouter;
