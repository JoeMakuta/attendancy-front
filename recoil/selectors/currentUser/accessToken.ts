import { selector } from "recoil";
import { currentUserState } from "../../atoms/currentUser";

export const getAccessTokenSelector = selector({
  key: "getAccessToken",
  get: ({ get }) => {
    const user = get(currentUserState);

    return user?.accessToken
  },
});
