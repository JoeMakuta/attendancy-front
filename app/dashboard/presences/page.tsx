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
  const [attendances, setAttendances] = useRecoilState(attendacesAtom);
  const [date, setDate] = useState<string>("");
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
        await setAttendances(Response.data?.data);
      }
    } catch (error) {
      setLoader(false);
    }
  };

  const onChange: DatePickerProps["onChange"] = (value, dateString) => {
    setDate(new Date(dateString).toDateString());
  };

  useEffect(() => {
    getAllAttendance();
  }, [currentUser]);

  return (
    <section className=" flex w-full flex-col gap-5 ">
      <div className=" flex justify-between w-full ">
        <h1 className=" font-bold text-2xl ">Listes de présences</h1>
        <div className=" flex gap-6 justify-start items-center">
          <h2>Filtrer par date : </h2>
          <DatePicker
            placeholder={attendances[attendances.length - 1]?.date.slice(0, 10)}
            format={"YYYY-MM-DD"}
            onChange={onChange}
            className="w-[200px]"
            size="large"
            disabledDate={(currentDate) => currentDate > dayjs().endOf("day")}
          />
        </div>
      </div>
      <h1 className=" font-bold ">Avant-midi </h1>
      <RepportTable
        vac={"AV"}
        date={
          date ||
          new Date(attendances[attendances.length - 1]?.date).toDateString()
        }
      />
      <h1 className=" font-bold ">Après-midi </h1>
      <RepportTable
        vac={"AP"}
        date={
          date ||
          new Date(attendances[attendances.length - 1]?.date).toDateString()
        }
      />
    </section>
  );
};

export default PresencePage;
