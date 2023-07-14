import { currentUserState } from "@/recoil/atoms/currentUser";
import { Avatar } from "antd";
import { useRouter } from "next/navigation";
import { AiOutlineUser } from "react-icons/ai";
import { BiSolidUserAccount } from "react-icons/bi";
import { useRecoilValue } from "recoil";

export default function ProfilMenu() {
  const currentUser = useRecoilValue(currentUserState);
  const router = useRouter();
  const logout = () => {
    localStorage.clear();
    router.push("/");
  };
  return (
    <div className="border cursor-pointer text-main_color border-main_color  rounded-md py-1 px-3">
      {/* //   <Menu>
    //     <MenuHandler>
    //       <div className="flex items-center justify-center gap-2">
    //         <p className="  font-semibold">Thierry23</p>
    //         <GoChevronDown />
    //       </div>
    //     </MenuHandler>
    //     <MenuList className="z-20 outline-none w-52">
    //       <MenuItem className="hover:bg-main_color/5 p-2 flex items-center gap-2">
    //         {" "}
    //         <FiUser className=" text-main_color" /> <span>Mon Profil</span>{" "}
    //       </MenuItem>
    //       <hr className="my-1" />
    //       <MenuItem
    //         onClick={() => {
    //           logout();
    //         }}
    //         className="hover:bg-main_color/5 p-2 flex items-center gap-2"
    //       >
    //         <FiLogOut className=" text-main_color" /> <span>Déconnexion</span>{" "}
    //       </MenuItem>
    //     </MenuList>
    //   </Menu>
    // <Avatar style={{ backgroundColor: "#87d068" }} icon={<AiOutlineUser />} /> */}
      <p className=" font-bold ">
        {currentUser?.user?.name[0]?.toUpperCase()}
        {currentUser?.user?.name?.substring(1)}
      </p>
    </div>
  );
}
