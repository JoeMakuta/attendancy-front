"use client";
import MyCard from "@/components/dashboard/card";
import RepportTable from "@/components/dashboard/repportTable";
import { currentUserState } from "@/recoil/atoms/currentUser";

import { Button, Card, Modal, Radio, message } from "antd";
import { useEffect, useState } from "react";
import { useRecoilState, useRecoilValue } from "recoil";

import { ICard, IStudent, IVacation } from "@/types/global";
import { PiStudent, PiStudentLight } from "react-icons/pi";
import { FiArrowDown, FiArrowUp, FiPlusCircle } from "react-icons/fi";
import axios, { Axios, AxiosResponse, AxiosResponseHeaders } from "axios";
import { ApiClient } from "@/helpers/apiClient";
import { studentsAtoms } from "@/recoil/atoms/students";
import { attendacesAtom } from "@/recoil/atoms/attendance";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { useRouter } from "next/navigation";

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
  const [presenceStatut, setPresenceStatut] = useState<"ABSENT" | "PRESENT">();
  const [showModal1, setShowModal1] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [vacation, setVacation] = useState<"AP" | "AV">("AV");
  const router = useRouter();

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

  const initDay = async (vacation: "AP" | "AV") => {
    try {
      setInitLoader(true);
      const Response = await ApiClient.post({
        data: { vacation },
        token: currentUser?.accessToken,
        url: "/api/attendance/new",
      });
      if (Response) {
        setShowModal(false);
        Modal.success({
          title: "Success!",
          content: "Présences initialisées avec success!",
          centered: true,
          okType: "default",
        });
        await getAllAttendance();
        router.push("/dashboard");
      }
      setInitLoader(false);
    } catch (error) {
      setInitLoader(false);
      Modal.error({
        title: "Erreur!",
        content: `Vous avez déjà fait l'initialisation des présences pour la vacation ${
          vacation == "AP" ? "Après-midi !" : "Avant-midi !"
        } `,
        centered: true,
        okType: "default",
      });
      setShowModal(false);
    }
  };

  // const yesterday = new Date().setDate(new Date().getDate() - 1);

  useEffect(() => {
    getAllAttendance();
  }, [currentUser]);

  return (
    <div className="flex gap-6 flex-col  w-full ">
      <div className=" flex justify-between items-center ">
        <h1 className=" font-bold text-2xl ">
          {"Rapport de la journée d'hier."}
        </h1>
        <button
          onClick={() => {
            setShowModal(true);
          }}
          className={`p-4 font-bold bg-white rounded-md text-main_color border border-main_color flex justify-center items-center gap-2 self-start h-10 hover:bg-main_color hover:text-white `}
        >
          <FiPlusCircle size={"20"} />

          <p>Nouvelle Journée</p>
        </button>
      </div>
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
      </div>
      <h1 className=" font-bold ">Avant-midi </h1>
      <RepportTable vac={"AV"} />
      <h1 className=" font-bold ">Après-midi </h1>
      <RepportTable vac={"AP"} />
      <Modal
        centered
        title="Veillez choisir une vacation"
        open={showModal}
        width={400}
        onCancel={() => setShowModal(false)}
        footer={[
          <div className=" flex gap-3 justify-end " key={"b1"}>
            <button
              onClick={() => {
                setShowModal(false);
              }}
              type="button"
              className={`flex items-center justify-center p-3 text-base h-10 rounded-lg border-[1px] border-main_color bg-white ${
                initLoader && "bg-main_color/50"
              } hover:bg-main_color hover:text-white transition-all duration-500 font-bold text-main_color active:bg-black`}
            >
              <span>Annuler</span>{" "}
            </button>
            <button
              className={`flex items-center justify-center gap-3  p-3 text-base h-10 rounded-lg bg-main_color ${
                initLoader && "bg-main_color/50"
              } hover:bg-main_color/50 transition-all duration-500 font-bold text-white active:bg-black`}
              onClick={() => initDay(vacation)}
            >
              {initLoader && (
                <AiOutlineLoading3Quarters
                  size={"20"}
                  className="animate-spin"
                />
              )}
              <span>Ok</span>{" "}
            </button>
          </div>,
        ]}
      >
        <Radio.Group
          onChange={(e) => setVacation(e.target.value)}
          value={vacation}
          size="large"
        >
          <Radio value={"AV"}>Avant-midi</Radio>
          <Radio value={"AP"}>Après-midi</Radio>
        </Radio.Group>
      </Modal>
      
    </div>
  );
};

export default Dashboard;
