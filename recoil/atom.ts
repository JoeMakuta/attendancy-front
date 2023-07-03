import { atom } from "recoil";
import { UserInterface } from "@/types/type";

export const userState = atom({
   key: 'userState',
   default: {} as UserInterface,
   
 });