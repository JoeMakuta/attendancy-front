import { atom } from "recoil";

export const loaderState = atom<boolean>({
   key : "loaderState",
   default: false
})