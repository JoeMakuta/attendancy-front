"use client";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useRecoilState } from "recoil";
import { currentUserState } from "@/recoil/atoms/currentUser";
import ProfilMenu from "@/components/dashboard/profileMenu";
import Menu from "@/components/dashboard/menu";
import { AiOutlineSearch } from "react-icons/ai";


const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
  const router = useRouter();
  const [currentUser, setCurrentUser] = useRecoilState(currentUserState);
  useEffect(() => {
    const user: string | null = localStorage.getItem("user");
    if (!user) {
      router.push("/");
    } else {
      setCurrentUser(JSON.parse(user as string));
    }
  }, [router, setCurrentUser]);

  return (
    <main>
      <div className="w-screen relative bg-white h-screen">
        <header className="flex  px-5 py-2 items-center w-[calc(100%-16rem)] float-right h-14 justify-end bg-whiter">
          <div className="flex items-center cursor-pointer gap-10">
            <div className="flex border rounded-md px-3 py-1 items-center gap-3">
            <AiOutlineSearch className=" text-main_color"/>
            <input
              type="email"
              required={true}
              placeholder="Rechercher ici..."
              className=" outline-none"
            />
            </div>
            <ProfilMenu/>
          </div>
        </header>
        <section className="flex w-64 px-3 h-full fixed items-center justify-center bg-whiter">
          <Menu/>
        </section>
        <section className="w-[calc(100%-16rem)]  h-[calc(100%-3.5rem)] flex items-center justify-center border border-main_color/40 absolute top-14 p-6 left-64 rounded-tl-3xl">
          {children}
        </section>
      </div>
    </main>
  );
};
export default DashboardLayout;
