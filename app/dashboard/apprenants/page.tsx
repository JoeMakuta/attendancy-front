"use client";
import RepportTable from "@/components/dashboard/repportTable";
import StudentRepportTable from "@/components/students/studentRepportTable";
import { ApiClient } from "@/helpers/apiClient";
import { currentUserState } from "@/recoil/atoms/currentUser";
import { studentsAtoms } from "@/recoil/atoms/students";
import { Button } from "antd";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { FiPlusCircle } from "react-icons/fi";
import { useRecoilState } from "recoil";

const Students = () => {
  const [currentUser, setCurrentUser] = useRecoilState(currentUserState);
  const [initLoader, setInitLoader] = useState(false);
  const [students, setStudents] = useRecoilState(studentsAtoms);
  const router = useRouter();

  return (
    <section className=" flex flex-col gap-4 ">
      <div className=" flex justify-between items-center  ">
        <h1 className=" font-bold text-2xl ">Tous les apprenants</h1>
        <Button
          onClick={() => {
            router.push("/dashboard/apprenants/nouvel");
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
          <p>Ajouter</p>
        </Button>
      </div>
      <StudentRepportTable />
    </section>
  );
};

export default Students;
