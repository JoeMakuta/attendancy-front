"use client";
import MyCard from "@/components/dashboard/card";
import RepportTable from "@/components/dashboard/repportTable";
import { currentUserState } from "@/recoil/atoms/currentUser";
import { userSelector } from "@/recoil/selectors/currentUser/user";
import { Button } from "@material-tailwind/react";
import { Card } from "antd";
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
    <div className="flex gap-6 flex-col ">
      <Button
        variant="outlined"
        className=" border w-40 h-10 border-main_color text-main_color"
      >
        New Day
      </Button>
      <div className=" flex gap-3 ">
        <MyCard />
        <MyCard />
        <MyCard />
      </div>
      <h1 className=" font-bold ">
        Rapport de la journée du {new Date().getDay() - 1}
      </h1>
      <RepportTable />
    </div>
  );
};

export default Dashboard;
