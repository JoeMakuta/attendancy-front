import { IAttendance } from "@/types/global";
import { atom } from "recoil";

export const attendacesAtom  = atom<IAttendance[]>({
   key : "attendacesAtom",
   default : []
})