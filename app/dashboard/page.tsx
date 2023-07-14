"use client";
import MyCard from "@/components/dashboard/card";
import RepportTable from "@/components/dashboard/repportTable";
import { currentUserState } from "@/recoil/atoms/currentUser";
import { userSelector } from "@/recoil/selectors/currentUser/user";

import { Button, Card, message } from "antd";
import { useEffect, useState } from "react";
import { useRecoilState, useRecoilValue } from "recoil";

import { ICard, IStudent } from "@/types/global";
import { PiStudent, PiStudentLight } from "react-icons/pi";
import { FiArrowDown, FiArrowUp, FiPlusCircle } from "react-icons/fi";
import axios, { Axios, AxiosResponse, AxiosResponseHeaders } from "axios";
import { ApiClient } from "@/helpers/apiClient";
import { studentsAtoms } from "@/recoil/atoms/students";
import { attendacesAtom } from "@/recoil/atoms/attendance";
import { AiOutlineLoading3Quarters } from "react-icons/ai";

interface User {
  email: string;
  name: string;
  password: string;
}

const Dashboard: React.FC = () => {
  const currentUser = useRecoilValue(currentUserState);
  const [students, setStudents] = useRecoilState(studentsAtoms);
  const [attendances, setAttendances] = useRecoilState(attendacesAtom);
  const [initLoader, setInitLoader] = useState(false);

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
      value: students?.length,
    },
  ];

  const getAllAttendance = async () => {
    const Response = await ApiClient.get({
      url: "/api/attendance",
      token: currentUser?.accessToken,
    });
    if (Response) {
      console.log("All Attendances = ", Response.data?.data);
      await setAttendances(Response.data?.data);
    }
  };

  const chooseVac = () => {
    const date: Date = new Date();
    if (date.getHours() > 13) {
      return "AP";
    } else {
      return "AV";
    }
  };

  const initDay = async () => {
    try {
      setInitLoader(true);
      const Response = await ApiClient.post({
        data: { vacation: chooseVac() },
        token: currentUser?.accessToken,
        url: "/api/attendance/new",
      });
      if (Response) {
        console.log("Init Day = ", Response.data?.data);
      }
      setInitLoader(false);
    } catch (error) {
      setInitLoader(false);
      message.open({
        key: "notification",
        type: "error",
        content: "Une erreur est survenu",
      });
    }
  };

  useEffect(() => {
    getAllAttendance();
  }, [currentUser]);

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
          onClick={() => {
            initDay();
          }}
          disabled={initLoader}
          className={`p-4 font-bold bg-white text-main_color border border-main_color flex justify-center items-center gap-2 self-start h-10 hover:bg-main_color hover:text-white ${
            initLoader ? "cursor-not-allowed" : ""
          } `}
        >
          {initLoader ? (
            <AiOutlineLoading3Quarters size={"20"} className="animate-spin" />
          ) : (
            <FiPlusCircle size={"20"} />
          )}
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
