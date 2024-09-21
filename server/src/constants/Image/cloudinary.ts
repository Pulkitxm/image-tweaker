import { v2 as cloudinary } from "cloudinary";
import {
  CLOUDINARY_API_KEY,
  CLOUDINARY_API_SECRET,
  CLOUDINARY_CLOUD_NAME,
} from "../../lib/constants";
import Image from "./index";
import Jimp from "jimp";
import streamifier from "streamifier";

console.log({
  cloud_name: CLOUDINARY_CLOUD_NAME,
  api_key: CLOUDINARY_API_KEY,
  api_secret: CLOUDINARY_API_SECRET,
});

cloudinary.config({
  cloud_name: CLOUDINARY_CLOUD_NAME,
  api_key: CLOUDINARY_API_KEY,
  api_secret: CLOUDINARY_API_SECRET,
});

export class CloudinaryImage implements Image {
  public imageId: string | undefined = undefined;
  constructor(imageId?: string) {
    this.imageId = imageId;
  }

  uploadImage({
    code,
    dbId,
    image,
  }: {
    image: Jimp | Buffer;
    dbId?: string;
    code?: string;
  }) {
    return new Promise(async (resolve, reject) => {
      let cld_upload_stream = cloudinary.uploader.upload_stream(
        {
          public_id: this.imageId
            ? this.imageId
            : `${image instanceof Buffer ? "original" : "filtered"}/${dbId}${
                code ? `-${code}` : ""
              }`,
        },
        function (error, result) {
          if (error) {
            return reject(error);
          }
          resolve(result);
        }
      );

      const imageBuffer =
        image instanceof Buffer
          ? image
          : await image.getBufferAsync(Jimp.MIME_PNG);

      streamifier
        .createReadStream(imageBuffer)
        .pipe(cld_upload_stream)
        .on("error", (error) => {
          reject(error);
        });
    });
  }

  async deleteImage(): Promise<{
    result: string;
  }> {
    return new Promise((resolve, reject) => {
      const { imageId } = this;
      if (!imageId) return reject("No imageId");
      cloudinary.uploader.destroy(imageId, function (error, result) {
        console.log({ error, result, imageId });

        if (error) {
          return reject(error);
        }
        resolve({
          result: "ok",
        });
      });
    });
  }

  async downloadImage(): Promise<Buffer> {
    return new Promise((resolve, reject) => {
      if (!this.imageId) return reject("No imageId");
      const imageUrl = cloudinary.url(this.imageId);
      fetch(imageUrl)
        .then((response) => {
          if (!response.ok) {
            throw new Error("Failed to download image");
          }
          return response.arrayBuffer();
        })
        .then((buffer) => resolve(Buffer.from(buffer)))
        .catch((error) => reject(error));
    });
  }
}
