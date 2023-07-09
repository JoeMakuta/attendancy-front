import { useRouter } from "next/navigation";
const ProfileMenu = () => {
  const router = useRouter();
  const Logout = () => {
    localStorage.clear();
    router.push("/");
  };
  return (
    <div className="flex flex-col absolute top-16 right-8 py-2 border-[1px] border-black/20 rounded-md  bg-white shadow-lg shadow-black/25 z-40 text-black ">
      <button className=" w-32 hover:bg-black/10 text-sm h-8 ">
        Edit Profile
      </button>
      <button className=" w-32 hover:bg-black/10 text-sm h-8 " onClick={Logout}>
        Logout
      </button>
    </div>
  );
};

export default ProfileMenu;
