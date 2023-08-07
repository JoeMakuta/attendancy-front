import { currentUserState } from "@/recoil/atoms/currentUser";
import { Dropdown, MenuProps} from "antd";
import { useRouter } from "next/navigation";
import { FiLogOut } from "react-icons/fi";
import { useRecoilValue } from "recoil";

export default function ProfilMenu() {
  const currentUser = useRecoilValue(currentUserState);

  const router = useRouter();
  const logout = () => {
    localStorage.clear();
    router.push("/");
  };

  const items: MenuProps["items"] = [
    {
      label: (
        <div
          onClick={() => {
            logout();
          }}
          className=" p-2   top-56 flex items-center gap-2"
        >
          <FiLogOut />
          <span>Déconnexion</span>
        </div>
      ),
      key: "0",
    },
  ];

  return (
    <Dropdown menu={{ items }} trigger={["click"]}>
      <a onClick={(e) => e.preventDefault()}>
        <div className="border cursor-pointer relative bg-main_color text-white font-bold rounded-full  h-12 w-12 flex justify-center items-center">
          <p className=" font-bold ">
            {currentUser?.user?.name[0]?.toUpperCase()}
          </p>
        </div>
      </a>
    </Dropdown>
  );
}
