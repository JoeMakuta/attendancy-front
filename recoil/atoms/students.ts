import { IStudent } from "@/types/global";
import { atom } from "recoil";

export const studentsAtoms  = atom<IStudent[]>({
   key : "studentsAtoms",
   default : []
})