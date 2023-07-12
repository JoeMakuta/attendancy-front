import {
  Menu,
  MenuHandler,
  MenuList,
  MenuItem,
} from "@material-tailwind/react";
import {GoChevronDown} from "react-icons/go"
import {FiUser,FiLogOut} from "react-icons/fi"
 
export default function ProfilMenu() {
  return (
    <div className="border text-white bg-main_color rounded-md py-1 px-3">

    <Menu>
      <MenuHandler>
        <div className="flex items-center justify-center gap-2">
        <p className="  font-semibold">Thierry23</p>
      <GoChevronDown/>
        </div>
      </MenuHandler>
      <MenuList className=" outline-none w-52">
        <MenuItem className="hover:bg-main_color/5 p-2 flex items-center gap-2"> <FiUser className=" text-main_color"/> <span>Mon Profil</span> </MenuItem>
        <hr className="my-1" />
        <MenuItem className="hover:bg-main_color/5 p-2 flex items-center gap-2"><FiLogOut className=" text-main_color"/> <span>Déconnexion</span> </MenuItem>
      </MenuList>
    </Menu>
    </div>
  );
}