"use client";

import { GoBell } from "react-icons/go";
import SearchBar from "./searchBar";
import User from "./user";
import { HiOutlineBell } from "react-icons/hi";
import { VscBell } from "react-icons/vsc";
import Menu from "./menu";
import ProfileMenu from "./profileMenu";
import { useState } from "react";

const MyHeader = () => {
  const [showMenu, setShowMenu] = useState(false);
  return (
    <section className="flex bg-white   justify-between px-3 sm:px-10  items-center h-[80px] md:h-[80px] min-h-[60px] w-full text-black fixed z-20">
      <div>
        <Menu />
      </div>
      <div className=" flex gap-4 justify-center items-center ">
        <SearchBar />
        <VscBell size={25} className="hidden sm:block cursor-pointer " />
        <div
          onClick={() => {
            setShowMenu((e) => !e);
          }}
        >
          <User />
        </div>
        {showMenu ? <ProfileMenu /> : null}
      </div>
    </section>
  );
};

export default MyHeader;
