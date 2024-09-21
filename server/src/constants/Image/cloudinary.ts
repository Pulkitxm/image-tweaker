import { v2 as cloudinary } from "cloudinary";
import {
  CLOUDINARY_API_KEY,
  CLOUDINARY_API_SECRET,
  CLOUDINARY_CLOUD_NAME,
} from "../../lib/constants";
import Image from "./index";
import Jimp from "jimp";

cloudinary.config({
  cloud_name: CLOUDINARY_CLOUD_NAME,
  api_key: CLOUDINARY_API_KEY,
  api_secret: CLOUDINARY_API_SECRET,
});

export class CloudinaryImage implements Image {
  public imageId: string;
  constructor() {
    this.imageId = "";
  }

  uploadImage({
    code,
    dbId,
    image,
  }: {
    image: import("jimp") | Buffer;
    dbId: string;
    code: string;
  }): Promise<any> {
    return new Promise((resolve, reject) => {
      if (image instanceof Buffer) {
        cloudinary.uploader.upload(
          image.toString("base64"),
          { public_id: `${dbId}-${code}` },
          (err, result) => {
            if (err) {
              reject(err);
            }
            resolve(result);
          }
        );
      } else {
        image.getBuffer(Jimp.MIME_PNG, (err, buffer) => {
          if (err) {
            reject(err);
          } else {
            cloudinary.uploader.upload(
              buffer.toString("base64"),
              { public_id: `${dbId}-${code}` },
              (err, result) => {
                if (err) {
                  reject(err);
                }
                resolve(result);
              }
            );
          }
        });
      }
    });
  }
}
