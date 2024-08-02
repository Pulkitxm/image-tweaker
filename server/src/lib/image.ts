import Jimp from "jimp";
import QueryString from "qs";
import { manipulateImage, sortQueryParamns } from "../utils/image";
import aws from "aws-sdk";
import {
  AWS_ACCESS_KEY_ID,
  AWS_S3_BUCKET,
  AWS_SECRET_ACCESS_KEY,
} from "./constants";

const s3 = new aws.S3({
  accessKeyId: AWS_ACCESS_KEY_ID,
  secretAccessKey: AWS_SECRET_ACCESS_KEY,
});

export async function handleManipulateImage(
  image: Buffer,
  searchParams: QueryString.ParsedQs,
  dbId: string
): Promise<Jimp | null> {
  try {
    const { sortedParams, code } = sortQueryParamns(searchParams);
    const img = await Jimp.read(image);
    const manipulatedImage = manipulateImage(img, sortedParams);
    code && uploadImageToS3(dbId, code, manipulatedImage);
    return manipulatedImage;
  } catch (error) {
    console.log(error);
    return null;
  }
}

export async function uploadImageToS3(
  dbId: string,
  code: string,
  image: Jimp
): Promise<aws.S3.PutObjectOutput | null> {
  try {
    const buffer = await image.getBufferAsync(Jimp.MIME_PNG);
    const params = {
      Bucket: AWS_S3_BUCKET,
      Key: `filtered/${dbId}-${code}.png`,
      Body: buffer,
      ContentType: Jimp.MIME_PNG,
    };
    return await s3.putObject(params).promise();
  } catch (error) {
    console.log(error);
    return null;
  }
}

export async function downloadImageFromS3(
  key: string
): Promise<aws.S3.GetObjectOutput | null> {
  try {
    const params = {
      Bucket: AWS_S3_BUCKET,
      Key: key,
    };
    return await s3.getObject(params).promise();
  } catch (error) {
    return null;
  }
}

export async function deleteImageFromS3(key: string): Promise<void> {
  try {
    const params = {
      Bucket: AWS_S3_BUCKET,
      Key: key,
    };
    await s3.deleteObject(params).promise();
  } catch (error) {
    console.log(error);
  }
}
