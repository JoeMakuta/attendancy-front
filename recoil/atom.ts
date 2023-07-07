import { atom } from "recoil";
import { IUser } from "@/types/type";

export const userState = atom({
   key: 'userState',
   default: {id:'',name:'', email:'', password:''} as IUser,
   
 });