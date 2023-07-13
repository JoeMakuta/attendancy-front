"use client";
import MyCard from "@/components/dashboard/card";
import RepportTable from "@/components/dashboard/repportTable";
import { currentUserState } from "@/recoil/atoms/currentUser";
import { userSelector } from "@/recoil/selectors/currentUser/user";
import { Button } from "@material-tailwind/react";
import { Card } from "antd";
import { useEffect, useState } from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import { BiArrowFromTop, BiArrowToBottom, BiArrowToTop } from "react-icons/bi";
import { ICard } from "@/types/global";
import { PiStudent, PiStudentLight } from "react-icons/pi";
import { FiArrowDown, FiArrowUp, FiPlusCircle } from "react-icons/fi";

interface User {
  email: string;
  name: string;
  password: string;
}

const cards: ICard[] = [
  {
    icon: <FiArrowUp />,
    status: true,
    suffix: "%",
    title: "Presences",
    value: 40,
  },
  {
    icon: <FiArrowDown />,
    status: false,
    suffix: "%",
    title: "Absences",
    value: 40,
  },
  {
    icon: <PiStudent />,
    status: true,
    suffix: "Apprenants",
    title: "Apprenants",
    value: 40,
  },
];

const Dashboard: React.FC = () => {
  const [currentUser, setCurrentUser] = useRecoilState(currentUserState);
  return (
    <div className="flex gap-6 flex-col  w-full ">
      <div className=" flex gap-3 justify-start items-center w-full">
        {cards.map(({ icon, status, suffix, title, value }, index) => {
          return (
            <MyCard
              key={index}
              icon={icon}
              status={status}
              suffix={suffix}
              title={title}
              value={value}
            />
          );
        })}
        <Button
          variant="filled"
          className="p-4  hover:bg-white hover:text-main_color hover:border hover:border-main_color flex justify-center items-center gap-2 self-start h-10 bg-main_color text-white"
        >
          <FiPlusCircle size={"20"} />
          <p>Nouvelle Journée</p>
        </Button>
      </div>
      <h1 className=" font-bold ">
        Rapport de la journée du {new Date().getDay() - 1}
      </h1>
      <RepportTable />
    </div>
  );
};

export default Dashboard;
