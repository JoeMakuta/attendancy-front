import { selector } from "recoil";
import { currentUserState } from "../../atoms/currentUser";

export const getCurrentUserSelector = selector({
  key: "getUser",
  get: ({ get }) => {
    const user = get(currentUserState);

      return user?.user
    
  },
});
