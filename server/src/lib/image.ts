import Jimp from "jimp";
import QueryString from "qs";
import { manipulateImage, sortQueryParamns } from "../utils/image";
import { CloudinaryImage } from "../constants/Image/cloudinary";

export async function handleManipulateImage(
  image: Buffer,
  searchParams: QueryString.ParsedQs,
  dbId: string
): Promise<Jimp | null> {
  try {
    const { sortedParams, code } = sortQueryParamns(searchParams);
    const img = await Jimp.read(image);
    const manipulatedImage = manipulateImage(img, sortedParams);
    if (code) {
      const image = new CloudinaryImage();
      await image.uploadImage({
        image: manipulatedImage,
        code,
        dbId,
      });
    }
    return manipulatedImage;
  } catch (error) {
    console.log(error);
    return null;
  }
}
