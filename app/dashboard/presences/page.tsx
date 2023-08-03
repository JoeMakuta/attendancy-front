"use client";
import RepportTable from "@/components/dashboard/repportTable";
import { ApiClient } from "@/helpers/apiClient";
import { attendacesAtom } from "@/recoil/atoms/attendance";
import { currentUserState } from "@/recoil/atoms/currentUser";
import { loaderState } from "@/recoil/atoms/loader";
import { DatePicker, DatePickerProps } from "antd";
import dayjs from "dayjs";
import { useEffect, useState } from "react";
import { useRecoilState, useRecoilValue } from "recoil";

const PresencePage = () => {
  const currentUser = useRecoilValue(currentUserState);
  const [date, setDate] = useState<string>(new Date().toDateString());
  const [attendances, setAttendances] = useRecoilState(attendacesAtom);
  const [loader, setLoader] = useRecoilState<boolean>(loaderState);

  const getAllAttendance = async () => {
    try {
      setLoader(true);
      const Response = await ApiClient.get({
        url: "/api/attendance",
        token: currentUser?.accessToken,
      });
      if (Response) {
        setLoader(false);
        console.log("All Attendances = ", Response.data?.data);
        await setAttendances(Response.data?.data);
      }
    } catch (error) {
      setLoader(false);
      console.log(error);
    }
  };

  const onChange: DatePickerProps["onChange"] = (value, dateString) => {
    setDate(new Date(dateString).toDateString());
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
          format={"YYYY-MM-DD"}
          onChange={onChange}
          className="w-[200px]"
          size="large"
          disabledDate={(currentDate) => currentDate > dayjs().endOf("day")}
        />
      </div>
      <h1 className=" font-bold ">Avant-midi </h1>
      <RepportTable vac={"AV"} date={date} />
      <h1 className=" font-bold ">Après-midi </h1>
      <RepportTable vac={"AP"} date={date} />
    </section>
  );
};

export default PresencePage;
