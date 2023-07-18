"use client";
import RepportTable from "@/components/dashboard/repportTable";
import NewStudentForm from "@/components/students/newStudent";
import StudentRepportTable from "@/components/students/studentRepportTable";
import { ApiClient } from "@/helpers/apiClient";
import { currentUserState } from "@/recoil/atoms/currentUser";
import { studentsAtoms } from "@/recoil/atoms/students";
import { Button, Modal } from "antd";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { FiPlusCircle } from "react-icons/fi";
import { useRecoilState } from "recoil";

const Students = () => {
  const [currentUser, setCurrentUser] = useRecoilState(currentUserState);
  const [showModal, setShowModal] = useState(false);
  const [students, setStudents] = useRecoilState(studentsAtoms);
  const router = useRouter();

  return (
    <section className=" flex flex-col gap-4 ">
      <div className=" flex justify-between items-center  ">
        <h1 className=" font-bold text-2xl ">Tous les apprenants</h1>
        <button
          onClick={() => setShowModal(true)}
          className={`p-4 font-bold bg-white rounded-md text-main_color border border-main_color flex justify-center items-center gap-2 self-start h-10 hover:bg-main_color hover:text-white
         `}
        >
          <FiPlusCircle size={"20"} />
          <p>Ajouter</p>
        </button>
      </div>
      <Modal
        centered
        title="Ajouter un nouvel apprenant"
        open={showModal}
        width={400}
        footer={null}
      >
        <NewStudentForm closeModal={setShowModal} />
      </Modal>
      <StudentRepportTable />
    </section>
  );
};

export default Students;
