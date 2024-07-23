import { Request, Response } from "express";
import { v2 as cloudinary, UploadApiResponse } from "cloudinary";
import { handleManipulateImage } from "../lib/image";
import axios from "axios";
import { UserType } from "../schema/user";
import {
  addImageToDb,
  deleteImageFromDb,
  getAnyImageUrlById,
  getImagePrivacyById,
  getImagesFromDb,
  getImageUrlById,
  getNumOfImages,
  updateImagePrivacyToDb,
} from "../db/user";
import { checkToken } from "../lib/user";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const matchPublicId = (imageUrl: string) => imageUrl.match(/\/v\d+\/(.+)\./);

export const getImages = async (request: Request, response: Response) => {
  try {
    const user = response.locals.user as UserType;
    const images = await getImagesFromDb(user.id);
    response.status(200).json(images);
  } catch (error) {
    response.status(500).json({ message: (error as Error).message });
  }
};

export const addImage = async (request: Request, response: Response) => {
  const user = response.locals.user as UserType;
  try {
    if (!request.file) {
      return response.status(400).json({ message: "No file uploaded" });
    }

    const numOfImages = await getNumOfImages(user.id);
    console.log(numOfImages);
    if (numOfImages >= 5) {
      return response.status(400).json({
        message:
          "You have reached the maximum number of images, either delete an image or make a new account",
      });
    }

    const uploadStream = cloudinary.uploader.upload_stream(
      async (error, result: UploadApiResponse | undefined) => {
        if (error) {
          response.status(500).json({ message: error.message });
        } else {
          if (result) {
            const imageData = await addImageToDb(result.secure_url, user.id);
            response
              .status(200)
              .json({ message: "Upload successful", ...imageData });
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
    const selectedImg = await getAnyImageUrlById(public_id);
    const selectedImgUrl = selectedImg.imageUrl;
    const isPublic = selectedImg.isPublic;
    if (!selectedImgUrl) {
      return response.status(404).json({ message: "Image not found" });
    }
    if (!isPublic) {
      const userId = await checkToken(request, response);
      if (!userId || userId !== selectedImg.createdById) {
        return response.status(401).json({ message: "Unauthorized Access" });
      }
    }
    const imageResponse = await axios.get(selectedImgUrl, {
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

export const handleDeleteImage = async (
  request: Request,
  response: Response
) => {
  const user = response.locals.user as UserType;
  const { public_id } = request.params;
  try {
    const imageUrlFromDb = await getImageUrlById(public_id, user.id);
    if (!imageUrlFromDb) {
      return response.status(404).json({ message: "Image not found" });
    }
    const publicId = matchPublicId(imageUrlFromDb)?.[1];
    if (!publicId) {
      return response.status(400).json({ message: "Invalid image URL" });
    }
    const deleteImage = await cloudinary.uploader.destroy(publicId);
    if (deleteImage.result !== "ok") {
      return response.status(500).json({ message: "Failed to delete image" });
    }
    const deleteImageId = await deleteImageFromDb(public_id, user.id);
    response
      .status(200)
      .json({ message: "Deletion successful", id: deleteImageId });
  } catch (error) {
    response.status(500).json({ message: (error as Error).message });
  }
};

export const handleGetImagePrivacyStatus = async (
  request: Request,
  response: Response
) => {
  const user = response.locals.user as UserType;
  const { public_id } = request.params;
  try {
    const isPublic = await getImagePrivacyById(public_id, user.id);
    if (isPublic != true && isPublic != false) {
      return response.status(404).json({ message: "Image not found" });
    }
    response.status(200).json({ isPublic });
  } catch (error) {
    response.status(500).json({ message: (error as Error).message });
  }
};

export const handleChangeImagePrivacy = async (
  request: Request,
  response: Response
) => {
  const user = response.locals.user as UserType;
  const { public_id } = request.params;
  console.log(request.body);
  const { isPublic } = request.body;
  if (isPublic == undefined) {
    return response
      .status(400)
      .json({ message: "Please provide isPublic in the request body" });
  }
  try {
    const imageUrlFromDb = await getImageUrlById(public_id, user.id);
    if (!imageUrlFromDb) {
      return response.status(404).json({ message: "Image not found" });
    }
    const updatedImage = await updateImagePrivacyToDb(
      public_id,
      isPublic,
      user.id
    );
    if (!updatedImage) {
      return response.status(500).json({ message: "Failed to update privacy" });
    }

    response
      .status(200)
      .json({ message: "Privacy updated successfully", success: true });
  } catch (error) {
    response.status(500).json({ message: (error as Error).message });
  }
};
