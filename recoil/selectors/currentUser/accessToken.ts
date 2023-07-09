import { selector } from "recoil";
import { currentUserState } from "../../atoms/currentUser";

export const userSelector = selector({
  key: "getAccessToken",
  get: ({ get }) => {
    const user = get(currentUserState);

    if(user.user && user.accessToken){
      return user.accessToken
    }else{
      // window.location.reload()
    }
  },
});
