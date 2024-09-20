import Jimp from "jimp";

export default abstract class Image {
  public imageId: string = "";
  abstract uploadImage({
    code,
    dbId,
    image,
  }: {
    image: Jimp | Buffer;
    dbId: string;
    code: string;
  }): Promise<any>;
  abstract deleteImage(imageKey: string): Promise<void>;
  abstract downloadImage(imageKey: string): Promise<any>;
}
