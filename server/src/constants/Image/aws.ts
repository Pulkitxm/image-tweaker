import aws from "aws-sdk";
import Image from "./index";
import Jimp from "jimp";
import {
  AWS_ACCESS_KEY_ID,
  AWS_REGION,
  AWS_S3_BUCKET,
  AWS_SECRET_ACCESS_KEY,
} from "../../lib/constants";

export class AwsImage implements Image {
  private s3Client: aws.S3;
  public imageId: string;
  private config: {
    AWS_ACCESS_KEY_ID: string;
    AWS_SECRET_ACCESS_KEY: string;
    AWS_REGION: string;
    IMAGE_KEY?: string | undefined;
  };

  constructor(IMAGE_KEY: string | undefined = undefined) {
    IMAGE_KEY && console.log("IMAGE_KEY", IMAGE_KEY);
    this.imageId = "";
    this.config = {
      AWS_ACCESS_KEY_ID: AWS_ACCESS_KEY_ID,
      AWS_SECRET_ACCESS_KEY: AWS_SECRET_ACCESS_KEY,
      AWS_REGION: AWS_REGION,
      IMAGE_KEY: IMAGE_KEY,
    };
    this.s3Client = new aws.S3({
      credentials: {
        accessKeyId: AWS_ACCESS_KEY_ID,
        secretAccessKey: AWS_SECRET_ACCESS_KEY,
      },
      region: AWS_REGION,
    });
  }

  async uploadImage({
    dbId,
    image,
    code,
  }: {
    image: Jimp | Buffer;
    dbId: string;
    code?: string;
  }): Promise<aws.S3.PutObjectOutput | null> {
    if (!this.config.IMAGE_KEY) {
      if (code) {
        const key = `filtered/${dbId}-${code}.png`;
        this.config.IMAGE_KEY = key;
      } else {
        const key = `original/${dbId}.png`;
        this.config.IMAGE_KEY = key;
      }
    }
    let buffer =
      image instanceof Buffer
        ? image
        : await image.getBufferAsync(Jimp.MIME_PNG);
    const params = {
      Bucket: AWS_S3_BUCKET,
      Body: buffer,
      ContentType: Jimp.MIME_PNG,
      Key: this.config.IMAGE_KEY,
    };
    return await this.s3Client.putObject(params).promise();
  }

  async deleteImage(): Promise<void> {
    if (!this.config.IMAGE_KEY) {
      return;
    }
    const params = {
      Bucket: AWS_S3_BUCKET,
      Key: this.config.IMAGE_KEY,
    };

    await this.s3Client.deleteObject(params).promise();
  }

  async downloadImage() {
    if (!this.config.IMAGE_KEY) {
      return;
    }
    const params = {
      Bucket: AWS_S3_BUCKET,
      Key: this.config.IMAGE_KEY,
    };
    console.log(params);
    return await this.s3Client.getObject(params).promise();
  }
}
