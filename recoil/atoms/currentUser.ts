import { IUser } from "@/types/global";
import { Loadable, RecoilValue, WrappedValue, atom } from "recoil";

export const currentUserState = atom<
  IUser
>({
  key: "userState",
  default: {
    accessToken: "",
    user: { id: "", name: "", email: "", password: "" },
  },
});
