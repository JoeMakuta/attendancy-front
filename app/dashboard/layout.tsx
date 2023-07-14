"use client";
import React, { useEffect, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { useRecoilState } from "recoil";
import { currentUserState } from "@/recoil/atoms/currentUser";
import ProfilMenu from "@/components/dashboard/profileMenu";
import Menu from "@/components/dashboard/menu";
import { AiOutlineSearch } from "react-icons/ai";
import { BiSearchAlt } from "react-icons/bi";

const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
  const router = useRouter();
  const path = usePathname();
  const [currentUser, setCurrentUser] = useRecoilState(currentUserState);
  useEffect(() => {
    const user: string | null = localStorage.getItem("user");
    const token: string | null = localStorage.getItem("accessToken");
    if (!user || !token) {
      router.push("/");
    } else {
      setCurrentUser({
        accessToken: JSON.parse(token as string),
        user: JSON.parse(user as string),
      });
    }
  }, [router, setCurrentUser]);

  return (
    <main>
      <div className="w-screen relative  bg-white h-screen">
        <section className="flex w-64 px-3 fixed  h-full  bg-whiter">
          <Menu />
        </section>
        <main className="relative left-64 flex flex-col w-[calc(100%-16.75rem)] ">
          <header className="flex gap-4 border-l-[1px]  z-10 fixed border-main_color/40 px-5 py-2 items-center w-[calc(100%-16.75rem)] justify-between h-20 bg-white">
            <div>
              <h1 className=" font-bold  ">
                Bienvenu {currentUser?.user?.name[0]?.toUpperCase()}
                {currentUser?.user?.name?.substring(1)} !
              </h1>
              <p className=" text-xs ">{path}</p>
            </div>
            <div className=" flex gap-4 ">
              <div className="relative flex w-full justify-center items-center gap-2 md:w-max">
                <input
                  type="search"
                  placeholder="Recherchez ici ..."
                  className=" bg-slate-200 focus:border-[1px]   rounded-lg outline-none focus:ring-[#007798]/30 focus:ring-2 h-full  pl-8 border-[1px] border-[#000]/10 transition-all"
                />
                <BiSearchAlt
                  size={"22"}
                  className="absolute text-main_color bg-opacity-25 hover:bg-opacity-100 left-2 top-[0.60rem]"
                />
              </div>
              <ProfilMenu />
            </div>
          </header>
          <section className=" relative top-20  max-w-full flex border-l-[1px] border-main_color/40  p-4 ">
            {children}
          </section>
        </main>
      </div>
    </main>
  );
};
export default DashboardLayout;
