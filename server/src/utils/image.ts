import Jimp from "jimp";
import QueryString from "qs";
import { ImageManipulation } from "../schema/image";
import { sortQueryParamnsIndex } from "../constants/image";

export function sortQueryParamns(searchParams: QueryString.ParsedQs) {
  let sortedParams: ImageManipulation[] = Array.from({
    length: sortQueryParamnsIndex.length,
  }).fill({ property: "", value: null }) as ImageManipulation[];
  Object.keys(searchParams)
    .sort()
    .forEach((key) => {
      if (sortQueryParamnsIndex.some((prop) => prop.property === key)) {
        const propIndex = sortQueryParamnsIndex.findIndex(
          (prop) => prop.property === key
        );
        const obj = sortQueryParamnsIndex[propIndex].type.safeParse(
          searchParams[key]
        );
        if (obj.success && obj.data != null)
          sortedParams[propIndex] = { property: key, value: obj.data };
      }
    });
  sortedParams = sortedParams.filter((param) => param.value !== null);
  return {
    sortedParams,
    code: getCode(sortedParams),
  };
}

export function getCode(sortedParams: ImageManipulation[]) {
  let code = "";
  sortedParams.forEach((param) => {
    const propIndex = sortQueryParamnsIndex.findIndex(
      (prop) => prop.property === param.property
    );
    code += `${propIndex}(${param.value})`;
  });
  return code;
}

export function manipulateImage(
  img: Jimp,
  sortedParams: ImageManipulation[]
): Jimp {
  let { width, height } = img.bitmap;
  sortedParams.forEach((param) => {
    switch (param.property) {
      case "rotate":
        img.rotate(param.value);
        break;
      case "width":
        width = param.value;
        break;
      case "height":
        height = param.value;
        break;
      case "crop":
        const [x, y, w, h] = param.value;
        img.crop(x, y, w, h);
        break;
      case "flip":
        img.flip(Boolean(param.value), Boolean(param.value));
        break;
      case "xflip":
        img.flip(Boolean(param.value), false);
        break;
      case "yflip":
        img.flip(false, Boolean(param.value));
        break;
      case "brightness":
        img.brightness(param.value);
        break;
      case "contrast":
        img.contrast(param.value);
        break;
      case "dither565":
        img.dither565();
        break;
      case "greyscale":
        img.greyscale();
        break;
      case "invert":
        img.invert();
        break;
      case "normalize":
        img.normalize();
        break;
      case "posterize":
        img.posterize(param.value);
        break;
      case "sepia":
        img.sepia();
        break;
      case "fade":
        img.fade(param.value);
        break;
      case "blur":
        img.blur(param.value);
        break;
      case "gaussian":
        img.gaussian(param.value);
        break;
      case "pixelate":
        img.pixelate(param.value);
        break;
      case "convolution":
        img.convolution(param.value);
        break;
      case "circle":
        img.circle();
        break;
      case "quality":
        img.quality(param.value);
        break;
      default:
        break;
    }
  });
  if (
    width &&
    height &&
    (width !== img.bitmap.width || height !== img.bitmap.height)
  ) {
    img.resize(width, height);
  }
  return img;
}
