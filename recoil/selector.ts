import { selector } from "recoil";
import { userState } from "./atom";

export const userSelector = selector({
   key : "userSelector",
   get : ({get}) => {
      return get(userState)
   }
})