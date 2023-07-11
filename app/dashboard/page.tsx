"use client";
import RepportTable from "@/components/dashboard/repportTable";
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
      <h1 className=" font-bold text-2xl ">
        Bienvenu {currentUser?.user?.name[0]?.toUpperCase()}
        {currentUser?.user?.name?.substring(1)} !
      </h1>
      <h1 className=" font-bold text-2xl ">Rapport de la journée</h1>
      <RepportTable />
    </div>
  );
};

export default Dashboard;
