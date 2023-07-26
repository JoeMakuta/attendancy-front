"use client";
import RepportTable from "@/components/dashboard/repportTable";
import { ApiClient } from "@/helpers/apiClient";
import { attendacesAtom } from "@/recoil/atoms/attendance";
import { currentUserState } from "@/recoil/atoms/currentUser";
import { DatePicker } from "antd";
import dayjs from "dayjs";
import { useEffect } from "react";
import { useRecoilState, useRecoilValue } from "recoil";

const PresencePage = () => {
  const currentUser = useRecoilValue(currentUserState);
  const [attendances, setAttendances] = useRecoilState(attendacesAtom);

  const getAllAttendance = async () => {
    try {
      const Response = await ApiClient.get({
        url: "/api/attendance",
        token: currentUser?.accessToken,
      });
      if (Response) {
        console.log("All Attendances = ", Response.data?.data);
        await setAttendances(Response.data?.data);
      }
    } catch (error) {
      console.log(error);
    }
  };
  // const yesterday = new Date().setDate(new Date().getDate() - 1);

  useEffect(() => {
    getAllAttendance();
  }, [currentUser]);
  return (
    <section className=" flex flex-col gap-5 ">
      <h1 className=" font-bold text-2xl ">Listes de présences</h1>
      <div className=" flex gap-6 justify-start items-center">
        <h2>Selectionner une date : </h2>
        <DatePicker
          placeholder="Selectionner une date"
          format={"YYYY/MM/DD"}
          // defaultValue={dayjs().endOf("day")}
          className="w-[200px]"
          size="large"
          disabledDate={(currentDate) => currentDate > dayjs().endOf("day")}
        />
      </div>
      <h1 className=" font-bold ">Avant-midi </h1>
      <RepportTable vac={"AV"} />
      <h1 className=" font-bold ">Après-midi </h1>
      <RepportTable vac={"AP"} />
    </section>
  );
};

export default PresencePage;
