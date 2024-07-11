import { z } from "zod";

export interface ImageManipulation {
  property: string;
  value: any;
}

export const checkNumStr = z.string().transform((val) => {
  const parsed = parseFloat(val);
  if (isNaN(parsed)) {
    return null;
  }
  return parsed;
});
export const checkArrStr = z.string().transform((val) => {
  const parsed = val.split(",").map(Number);
  if (parsed.length !== 4) {
    return null;
  }
  return parsed;
});
export const checkFlip = checkNumStr.transform((val) => {
  if (val === null) {
    return null;
  }
  if (![0, 1].includes(val)) {
    return null;
  }
  return val;
});
export const checkValbetweenminus1and1 = checkNumStr.transform((val) => {
  if (val === null) {
    return null;
  }
  if (val < -1 || val > 1) {
    return null;
  }
  return val;
});
export const checkValbetween0and1 = checkNumStr.transform((val) => {
  if (val === null) {
    return null;
  }
  if (val < 0 || val > 1) {
    return null;
  }
  return val;
});
export const greaterThan0 = z.string().transform((val) => {
  if (val === null) {
    return null;
  }
  if (parseInt(val) > 0) {
    return parseInt(val);
  }
  return null;
});
export const checkIfPresent = z.any().transform(() => true);
