import { IUser } from "@/types/global";
import { atom } from "recoil";

export const currentUserState = atom<IUser>({
  key: "userState",
  default: {
    accessToken: localStorage.getItem("accessToken")
      ? JSON.parse(localStorage.getItem("accessToken") as string)
      : null,
    user: localStorage.getItem("user")
      ? JSON.parse(localStorage.getItem("user") as string)
      : null,
  },
});
