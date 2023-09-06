"use client";
import MyCard from "@/components/dashboard/card";
import RepportTable from "@/components/dashboard/repportTable";
import { currentUserState } from "@/recoil/atoms/currentUser";

import { Button, Card, Modal, Radio, message } from "antd";
import { useCallback, useEffect, useState } from "react";
import { useRecoilState, useRecoilValue } from "recoil";

import {
  IAttendance,
  ICard,
  IStudent,
  IStudentAttendance,
  IVacation,
} from "@/types/global";
import { PiStudent, PiStudentLight } from "react-icons/pi";
import { FiArrowDown, FiArrowUp, FiPlusCircle } from "react-icons/fi";
import axios, { Axios, AxiosResponse, AxiosResponseHeaders } from "axios";
import { ApiClient } from "@/helpers/apiClient";
import { studentsAtoms } from "@/recoil/atoms/students";
import { attendacesAtom } from "@/recoil/atoms/attendance";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { useRouter } from "next/navigation";
import { loaderState } from "@/recoil/atoms/loader";
interface User {
  email: string;
  name: string;
  password: string;
}

const Dashboard: React.FC = () => {
  const currentUser = useRecoilValue(currentUserState);
  const [students, setStudents] = useRecoilState<IStudent[]>(studentsAtoms);
  const [attendances, setAttendances] =
    useRecoilState<IAttendance[]>(attendacesAtom);
  const [initLoader, setInitLoader] = useState<boolean>(false);
  const [showModal, setShowModal] = useState<boolean>(false);
  const [vacation, setVacation] = useState<"AP" | "AV">("AV");
  const router = useRouter();
  const [loader, setLoader] = useRecoilState<boolean>(loaderState);

  const countAttendances = useCallback(
    (status: "ABSENT" | "PRESENT") => {
      return (
        attendances[attendances.length - 1]?.students.filter(
          (elt) => elt.status == status
        ).length +
        attendances[attendances.length - 2]?.students.filter(
          (elt) => elt.status == status
        ).length
      );
    },
    [attendances]
  );

  const [numberPresence, setNumberPresence] = useState<number>(
    countAttendances("PRESENT")
  );
  const [numberAbsence, setNumberAbsence] = useState<number>(
    countAttendances("ABSENT")
  );
  const cards: ICard[] = [
    {
      icon: <FiArrowUp />,
      status: true,
      suffix: "%",
      title: "Présences",
      value: ((numberPresence * 100) / (attendances[attendances.length - 1]?.students.length + attendances[attendances.length - 2]?.students.length)) | 0,
    },
    {
      icon: <FiArrowDown />,
      status: false,
      suffix: "%",
      title: "Absences",
      value: ((numberAbsence * 100) / (attendances[attendances.length - 1]?.students.length + attendances[attendances.length - 2]?.students.length)) | 0,
    },
    {
      icon: <PiStudent />,
      status: true,
      suffix: "Apprenants",
      title: "Apprenants",
      value: students?.length,
    },
  ];

  const initDay = async () => {
    try {
      setInitLoader(true);
      const Response = await ApiClient.post({
        data: { vacation: "AP" },
        token: currentUser?.accessToken,
        url: "/api/attendance/new",
      });
      const Response1 = await ApiClient.post({
        data: { vacation: "AV" },
        token: currentUser?.accessToken,
        url: "/api/attendance/new",
      });
      if (Response && Response1) {
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
        content: `Vous avez déjà fait l'initialisation des présences pour cette journée!`,
        centered: true,
        okType: "default",
      });
      setShowModal(false);
    }
  };

  const getAllAttendance = useCallback(async () => {
    try {
      setLoader(true);
      const Response = await ApiClient.get({
        url: "/api/attendance",
        token: currentUser?.accessToken,
      });
      if (Response) {
        await setAttendances(Response.data?.data);
      }
      setLoader(false);
    } catch (error) {
      setLoader(false);
    }
  }, [currentUser, setAttendances, setLoader]);
  // const yesterday = new Date().setDate(new Date().getDate() - 1);

  useEffect(() => {
    getAllAttendance();
  }, [getAllAttendance]);

  useEffect(() => {
    setNumberPresence(countAttendances("PRESENT"));
    setNumberAbsence(countAttendances("ABSENT"));
  }, [countAttendances]);

  return (
    <div className="flex gap-6 flex-col  w-full ">
      <div className=" flex justify-between items-center ">
        <h1 className=" font-bold text-2xl ">
          {`${
            attendances[attendances.length - 1]
              ? "Rapport de la journée du " +
                new Date(
                  attendances[attendances.length - 1]?.date
                ).toLocaleDateString("fr")
              : "Chargement ..."
          }`}
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
      <RepportTable
        vac={"AV"}
        date={new Date(
          attendances[attendances.length - 1]?.date
        ).toDateString()}
      />
      <h1 className=" font-bold ">Après-midi </h1>
      <RepportTable
        vac={"AP"}
        date={new Date(
          attendances[attendances.length - 1]?.date
        ).toDateString()}
      />
      <Modal
        centered
        title="Initialisation de la journée"
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
              <span>Non</span>{" "}
            </button>
            <button
              className={`flex items-center justify-center gap-3  p-3 text-base h-10 rounded-lg bg-main_color ${
                initLoader && "bg-main_color/50"
              } hover:bg-main_color/50 transition-all duration-500 font-bold text-white active:bg-black`}
              onClick={() => initDay()}
            >
              {initLoader && (
                <AiOutlineLoading3Quarters
                  size={"20"}
                  className="animate-spin"
                />
              )}
              <span>Oui</span>{" "}
            </button>
          </div>,
        ]}
      >
        Voulez-vous initialiser la journée ?
      </Modal>
    </div>
  );
};

export default Dashboard;
