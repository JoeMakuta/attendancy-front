import {
  Menu,
  MenuHandler,
  MenuList,
  MenuItem,
} from "@material-tailwind/react";
import { GoChevronDown } from "react-icons/go";
import { FiUser, FiLogOut } from "react-icons/fi";
import { useRouter } from "next/navigation";

export default function ProfilMenu() {
  const router = useRouter();
  const logout = () => {
    localStorage.clear();
    router.push("/");
  };
  return (
    <div className="border  text-main_color border-main_color  rounded-md py-1 px-3">
      <Menu>
        <MenuHandler>
          <div className="flex items-center justify-center gap-2">
            <p className="  font-semibold">Thierry23</p>
            <GoChevronDown />
          </div>
        </MenuHandler>
        <MenuList className="z-20 outline-none w-52">
          <MenuItem className="hover:bg-main_color/5 p-2 flex items-center gap-2">
            {" "}
            <FiUser className=" text-main_color" /> <span>Mon Profil</span>{" "}
          </MenuItem>
          <hr className="my-1" />
          <MenuItem
            onClick={() => {
              logout();
            }}
            className="hover:bg-main_color/5 p-2 flex items-center gap-2"
          >
            <FiLogOut className=" text-main_color" /> <span>Déconnexion</span>{" "}
          </MenuItem>
        </MenuList>
      </Menu>
    </div>
  );
}
