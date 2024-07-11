import Jimp from "jimp";
import QueryString from "qs";
import { manipulateImage, sortQueryParamns } from "../utils/image";

export async function handleManipulateImage(image: Buffer, searchParams: QueryString.ParsedQs): Promise<Jimp | null> {
    try {
        const { sortedParams, code } = sortQueryParamns(searchParams);
        const img = await Jimp.read(image);
        return manipulateImage(img, sortedParams);
    } catch (error) {
        console.log(error);
        return null;
    }
};