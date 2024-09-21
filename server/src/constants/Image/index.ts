import Jimp from "jimp";

export default abstract class Image {
  public imageId: string | undefined = undefined;
  abstract uploadImage({
    code,
    dbId,
    image,
  }: {
    image: Jimp | Buffer;
    dbId: string;
    code: string;
  }): Promise<any>;
  abstract deleteImage(imageKey: string): Promise<any>;
  abstract downloadImage(imageKey: string): Promise<any>;
}
