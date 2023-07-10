import { selector } from "recoil";
import { currentUserState } from "../../atoms/currentUser";

export const userSelector = selector({
  key: "getUser",
  get: ({ get }) => {
    const user = get(currentUserState);

    if(user.user && user.accessToken){
      return user.user
    }else{
      // window.location.reload()
    }
  },
});
