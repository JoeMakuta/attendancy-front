"use client";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useRecoilState } from "recoil";
import { currentUserState } from "@/recoil/atoms/currentUser";
import ProfilMenu from "@/components/dashboard/profileMenu";
import Menu from "@/components/dashboard/menu";
import { AiOutlineSearch } from "react-icons/ai";
import { Button, Input } from "@material-tailwind/react";

const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
  const router = useRouter();
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
      <div className="w-screen relative bg-white h-screen">
        <header className="flex gap-4  px-5 py-2 items-center w-screen justify-end h-20 bg-white">
          <div className="relative flex w-full gap-2 md:w-max">
            <Input
              type="search"
              placeholder="Recherchez ici ..."
              className="pr-20 bg-slate-200 focus:border-[1px]   rounded-lg outline-none focus:ring-[#E5203D]/30 focus:ring-1  border-[1px] border-[#000]/10 transition-all"
              containerProps={{
                className: "min-w-[288px]",
              }}
            />
            <Button
              size="sm"
              className="!absolute bg-main_color bg-opacity-25 hover:bg-opacity-100 right-1 top-1 rounded"
            >
              Search
            </Button>
          </div>
          <ProfilMenu />
        </header>
        <main className=" flex ">
          <section className="flex w-64 px-3  fixed  bg-whiter pt-4">
            <Menu />
          </section>
          <section className="w-[calc(100%-16rem)] h-[calc(100%-5rem)]  flex border border-main_color/40 absolute top-20 p-6 left-64 ">
            {children}
          </section>
        </main>
      </div>
    </main>
  );
};
export default DashboardLayout;
