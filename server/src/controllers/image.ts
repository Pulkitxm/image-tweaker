import { Request, Response } from "express";
import { v2 as cloudinary } from "cloudinary";
import { handleManipulateImage } from "../lib/image";
import { UserType } from "../schema/user";
import {
  addImageToDb,
  deleteImageFromDb,
  getAnyImageKeyById,
  getImagePrivacyById,
  getImagesFromDb,
  getImageKeyById,
  getNumOfImages,
  updateImagePrivacyToDb,
} from "../db/user";
import { checkToken } from "../lib/user";
import {
  CLOUDINARY_API_KEY,
  CLOUDINARY_API_SECRET,
  CLOUDINARY_CLOUD_NAME,
} from "../lib/constants";
import { sortQueryParamns } from "../utils/image";
import fs from "fs";
import path from "path";
import { CloudinaryImage } from "../constants/Image/cloudinary";

cloudinary.config({
  cloud_name: CLOUDINARY_CLOUD_NAME,
  api_key: CLOUDINARY_API_KEY,
  api_secret: CLOUDINARY_API_SECRET,
});

export const getImages = async (request: Request, response: Response) => {
  try {
    const user = response.locals.user as UserType;
    const images = await getImagesFromDb(user.id, true);
    const userId = user.id;
    const newImages = images.map((image) => {
      return {
        id: image.id,
        isPublic: image.isPublic,
        isOwner: image.createdById === userId,
      };
    });
    response.status(200).json(newImages);
  } catch (error) {
    response.status(500).json({ message: (error as Error).message });
  }
};

export const addImage = async (request: Request, response: Response) => {
  const imageDestination = request.file?.destination;
  const imageBuffer = fs.readFileSync(
    `${imageDestination}/${request.file?.filename}`
  );
  if (!imageBuffer) {
    console.log("no file uploaded");

    return response.status(400).json({ message: "No file uploaded" });
  }
  const user = response.locals.user as UserType;
  try {
    if (!request.file) {
      return response.status(400).json({ message: "No file uploaded" });
    }

    const numOfImages = await getNumOfImages(user.id);
    if (numOfImages >= 5) {
      return response.status(400).json({
        message:
          "You have reached the maximum number of images, either delete an image or make a new account",
      });
    }

    const key = `original/${`${user.id}-${new Date().getTime()}`}`;
    const imageData = await addImageToDb(key, user.id);
    const cloudinaryImage = new CloudinaryImage(key);
    await cloudinaryImage.uploadImage({
      dbId: imageData.id,
      image: imageBuffer,
    });
    fs.rmSync(`${imageDestination}/${request.file?.filename}`);
    response.status(200).json({ message: "Upload successful", ...imageData });
  } catch (error) {
    console.log("error", error);
    response.status(500).json({ message: (error as Error).message });
  }
};

export const getImageById = async (request: Request, response: Response) => {
  try {
    const { public_id } = request.params;
    const searchParams = request.query;
    const selectedImg = await getAnyImageKeyById(public_id);
    const selectedimageKey = selectedImg.imageKey;

    const isPublic = selectedImg.isPublic;
    if (!selectedimageKey) {
      return response.status(404).json({ message: "Image not found" });
    }
    if (!isPublic) {
      const userId = await checkToken(request, response);
      if (!userId || userId !== selectedImg.createdById) {
        return response.status(401).json({ message: "Unauthorized Access" });
      }
      selectedImg.isOwner = selectedImg.id === userId;
    }
    try {
      if (Object.keys(searchParams).length > 0) {
        try {
          const { code } = sortQueryParamns(searchParams);
          const key = `filtered/${public_id}-${code}.png`;
          const image = new CloudinaryImage(key);
          const imageResponse = await image.downloadImage();
          if (imageResponse) {
            response.writeHead(200, {
              "Content-Type": "image/png",
              "Content-Length": imageResponse.length,
            });
            response.end(imageResponse);
            return;
          }
        } catch (error) {}
      }

      const image = new CloudinaryImage(selectedimageKey);
      const imageData = await image.downloadImage();
      if (!imageData) {
        console.log("Image not found in Cloudinary");

        return response.status(500).json({ message: "Failed to fetch image" });
      }

      if (Object.keys(searchParams).length == 0) {
        response.writeHead(200, {
          "Content-Type": "image/png",
          "Content-Length": imageData.length,
        });
        response.end(imageData);
        return;
      }

      const manipulatedImage = await handleManipulateImage(
        imageData,
        searchParams,
        selectedImg.id
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
      response.status(500).json({ message: "Failed to fetch image" });
    }
  } catch (error) {
    console.log("error", error);

    response.status(500).json({ error });
  }
};

export const getImageDetails = async (request: Request, response: Response) => {
  const { public_id } = request.params;
  const userId = await checkToken(request, response);
  if (!userId) {
    return response.status(401).json({ message: "Unauthorized Access" });
  }
  const image = await getAnyImageKeyById(public_id);
  image.isOwner = image.createdById === userId;
  if (!image) {
    return response.status(404).json({ message: "Image not found" });
  }
  if (image.createdById !== userId) {
    return response.status(401).json({ message: "Unauthorized Access" });
  }
  response.status(200).json({
    id: image.id,
    isPublic: image.isPublic,
    isOwner: image.isOwner,
  });
};

export const handleDeleteImage = async (
  request: Request,
  response: Response
) => {
  const user = response.locals.user as UserType;
  const { public_id } = request.params;
  try {
    const imageKeyFromDb = await getImageKeyById(public_id, user.id);
    if (!imageKeyFromDb) {
      return response.status(404).json({ message: "Image not found" });
    }
    const image = new CloudinaryImage(imageKeyFromDb);
    const deleteImage = await image.deleteImage();
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
  const { isPublic } = request.body;
  if (isPublic == undefined) {
    return response
      .status(400)
      .json({ message: "Please provide isPublic in the request body" });
  }
  try {
    const imageKeyFromDb = await getImageKeyById(public_id, user.id);
    if (!imageKeyFromDb) {
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
