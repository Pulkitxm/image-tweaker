import { atom } from "recoil";
import { Images } from "../schem/image";

export const imagesState = atom<Images>({
  key: "images",
  default: [],
});

export const openUploadDialogState = atom<boolean>({
  key: "openUploadDialog",
  default: true,
});
