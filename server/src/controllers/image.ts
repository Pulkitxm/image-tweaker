import { Request, Response } from "express";
import { v2 as cloudinary, UploadApiResponse } from "cloudinary";
import { handleManipulateImage } from "../lib/image";
import axios from "axios";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export const addImage = async (request: Request, response: Response) => {
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
            // store.push({ public_id, secure_url: result.secure_url });
            response
              .status(200)
              .json({ message: "Upload successful", public_id });
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
};

export const getImageById = async (request: Request, response: Response) => {
  try {
    const { public_id } = request.params;
    const searchParams = request.query;
    // const selectedImg = store.find((image) => image.public_id === public_id);
    // if (!selectedImg) {
    //     return response.status(404).json({ message: 'Image not found' });
    // }
    // const imageUrl = selectedImg.secure_url;
    // const imageUrl = store.find(
    //   (image) => image.public_id === public_id
    // )?.secure_url;
    const imageUrl = "";
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
};
