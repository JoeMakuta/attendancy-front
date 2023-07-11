"use client";
import { currentUserState } from "@/recoil/atoms/currentUser";
import { userSelector } from "@/recoil/selectors/currentUser/user";
import { useEffect, useState } from "react";
import { useRecoilState, useRecoilValue } from "recoil";

interface User {
  email: string;
  name: string;
  password: string;
}

const Dashboard: React.FC = () => {
  const [currentUser, setCurrentUser] = useRecoilState(currentUserState);
  return (
    <div className="flex flex-col ">
      <h1 className=" font-bold text-4xl ">
        Bienvenu {currentUser?.user?.name[0]?.toUpperCase()}
        {currentUser?.user?.name?.substring(1)} !
      </h1>
      <div>Body</div>
    </div>
  );
};

export default Dashboard;
