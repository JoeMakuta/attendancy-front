import { selector } from "recoil";
import { currentUserState } from "../../atoms/currentUser";

export const userSelector = selector({
  key: "getUser",
  get: ({ get }) => {
    const user = get(currentUserState);

      return user?.user
    
  },
});
