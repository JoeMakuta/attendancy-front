"use client";
import NewStudentForm from "@/components/students/newStudent";
import StudentRepportTable from "@/components/students/studentRepportTable";
import { currentUserState } from "@/recoil/atoms/currentUser";
import { loaderState } from "@/recoil/atoms/loader";
import { studentsAtoms } from "@/recoil/atoms/students";
import { Modal } from "antd";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { FiPlusCircle } from "react-icons/fi";
import { useRecoilState } from "recoil";

const Students = () => {
  const [currentUser, setCurrentUser] = useRecoilState(currentUserState);
  const [showModal, setShowModal] = useState(false);
  const [students, setStudents] = useRecoilState(studentsAtoms);
  const router = useRouter();
  const [loader, setLoader] = useRecoilState<boolean>(loaderState);

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
        onCancel={() => setShowModal(false)}
      >
        <NewStudentForm closeModal={setShowModal} />
      </Modal>
      <StudentRepportTable />
    </section>
  );
};

export default Students;
