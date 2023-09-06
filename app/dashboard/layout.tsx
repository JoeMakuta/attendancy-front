"use client";
import React, { useEffect, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { useRecoilState } from "recoil";
import { currentUserState } from "@/recoil/atoms/currentUser";
import ProfilMenu from "@/components/dashboard/profileMenu";
import Menu from "@/components/dashboard/menu";
import { AiOutlineSearch } from "react-icons/ai";
import { BiSearchAlt } from "react-icons/bi";
import { ApiClient } from "@/helpers/apiClient";
import { studentsAtoms } from "@/recoil/atoms/students";
import { Input } from "antd";
import Search from "antd/es/input/Search";
import { loaderState } from "@/recoil/atoms/loader";

const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
  const router = useRouter();
  const path = usePathname();
  const [currentUser, setCurrentUser] = useRecoilState(currentUserState);
  const [students, setStudents] = useRecoilState(studentsAtoms);
  const [loader, setLoader] = useRecoilState<boolean>(loaderState);

  const getAllStudents = async () => {
    const Response = await ApiClient.get({
      url: "/api/students",
      token: currentUser?.accessToken,
    });
    if (Response) {
      await setStudents(Response.data?.data);
    }
  };

  useEffect(() => {
    getAllStudents();
  }, [currentUser]);

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
      {/* {loader ? (
        <div className=" flex justify-center items-center w-screen h-screen bg-black/5 fixed z-50 backdrop-blur-[2px] ">
          <svg
            width="38"
            height="38"
            viewBox="0 0 38 38"
            xmlns="http://www.w3.org/2000/svg"
            stroke="#000"
          >
            <g fill="none" fill-rule="evenodd">
              <g transform="translate(1 1)" stroke-width="2">
                <circle stroke-opacity=".5" cx="18" cy="18" r="18" />
                <path d="M36 18c0-9.94-8.06-18-18-18">
                  <animateTransform
                    attributeName="transform"
                    type="rotate"
                    from="0 18 18"
                    to="360 18 18"
                    dur="1s"
                    repeatCount="indefinite"
                  />
                </path>
              </g>
            </g>
          </svg>
        </div>
      ) : null} */}
      <div className="w-screen relative bg-white h-screen grid grid-cols-[70px_1fr]  md:grid-cols-[270px_1fr] grid-rows-[80px_1fr]">
        <header className="flex  gap-4 border-l-[1px] border-b-[1px]  border-main_color/20 px-5 py-2 items-center md:w-full justify-between h-20 bg-white">
          <div>
            <h1 className=" font-bold  ">
              Bienvenu {currentUser?.user?.name[0]?.toUpperCase()}
              {currentUser?.user?.name?.substring(1)} !
            </h1>
            <p className=" text-xs ">{path}</p>
          </div>
          <div className=" flex gap-4 justify-center items-center">
            {/* <Input.Search
              size="large"
              style={{ width: "500px" }}
              placeholder="Recherchez ici ..."
            /> */}

            <ProfilMenu />
          </div>
        </header>
        <section className="flex  w-64 px-3 row-start-1 row-end-3  h-full  bg-whiter">
          <Menu />
        </section>
        <section className=" pt-5 flex border-l-[1px] border-main_color/20  min-w-full min-h-full overflow-y-scroll overflow-x-hidden p-4 ">
          {children}
        </section>
      </div>
    </main>
  );
};
export default DashboardLayout;
