import { atom } from "recoil";

export const tokenState = atom<string | undefined>({
  key: "token",
  default: undefined,
});
