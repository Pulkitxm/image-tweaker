import {
    ImageManipulation,
    checkNumStr,
    checkArrStr,
    checkFlip,
    checkIfPresent,
    checkValbetween0and1,
    checkValbetweenminus1and1,
    greaterThan0,
  } from "../types/image";

export const sortQueryParamnsIndex = [
  // Basic image manipulation
  { property: "rotate", type: checkNumStr }, // url: /image?rotate=90 0-360
  { property: "width", type: checkNumStr }, // url: /image?width=100 any number
  { property: "height", type: checkNumStr }, // url: /image?height=100 any number
  { property: "crop", type: checkArrStr }, // url: /image?crop=100,100,100,100
  { property: "flip", type: checkFlip }, // url: /image?flip=0.5
  { property: "xflip", type: checkFlip }, // url: /image?xflip=0.5
  { property: "yflip", type: checkFlip }, // url: /image?yflip=0.5

  // Color Adjustments
  { property: "brightness", type: checkValbetweenminus1and1 }, // url: /image?brightness=0.5 (-1)-1
  { property: "contrast", type: checkValbetweenminus1and1 }, // url: /image?contrast=0.5 (-1)-1
  { property: "dither565", type: checkIfPresent }, // url: /image?dither565 any
  { property: "greyscale", type: checkIfPresent }, // url: /image?greyscale any
  { property: "invert", type: checkIfPresent }, // url: /image?invert any
  { property: "normalize", type: checkIfPresent }, // url: /image?normalize any
  { property: "posterize", type: checkNumStr }, // url: /image?posterize=0.5 any number
  { property: "sepia", type: checkIfPresent }, // url: /image?sepia any
  { property: "fade", type: checkValbetween0and1 }, // url: /image?fade=0.5

  // Filters and Effects
  { property: "blur", type: greaterThan0 }, // url: /image?blur=2 any number greater than 0
  { property: "gaussian", type: greaterThan0 }, // url: /image?gaussian=0.5 any number greater than 0
  { property: "pixelate", type: checkNumStr }, // url: /image?pixelate=0.5 any number

  // Drawing and Text
  { property: "circle", type: checkIfPresent }, // url: /image?circle any

  // File Operations
  { property: "quality", type: checkNumStr }, // url: /image?quality=0.5
];
