"use client";
import React, { useEffect, useState } from "react";
import MyHeader from "@/components/header/header";
import { useRouter } from "next/navigation";
import { useRecoilState } from "recoil";
import { currentUserState } from "@/recoil/atoms/currentUser";

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
  }, []);
  return (
    <main>
      <MyHeader />
      <div className="bg-black/10 flex justify-center items-center w-[100vw] h-[100vh] pt-16">
        {children}
      </div>
    </main>
  );
};
export default DashboardLayout;
