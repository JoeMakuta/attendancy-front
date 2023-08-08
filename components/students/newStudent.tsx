"use client";
import { ApiClient } from "@/helpers/apiClient";
import { currentUserState } from "@/recoil/atoms/currentUser";
import { studentsAtoms } from "@/recoil/atoms/students";
import { Modal } from "antd";
import { useRouter } from "next/navigation";
import { Dispatch, SetStateAction, useState } from "react";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { useRecoilState, useRecoilValue } from "recoil";

const NewStudentForm = ({
  closeModal,
}: {
  closeModal: Dispatch<SetStateAction<boolean>>;
}) => {
  const [isLoading, setIsLoading] = useState(false);
  const [firstname, setFirstname] = useState("");
  const [middlename, setMiddlename] = useState("");
  const [lastname, setLastname] = useState("");
  const [vacation, setVacation] = useState("AV");
  const currentUser = useRecoilValue(currentUserState);
  const router = useRouter();

  const [students, setStudents] = useRecoilState(studentsAtoms);

  const getAllStudents = async () => {
    const Response = await ApiClient.get({
      url: "/api/students",
      token: currentUser?.accessToken,
    });
    if (Response) {
      await setStudents(Response.data?.data);
    }
  };

  const resetStates = () => {
    setFirstname("");
    setMiddlename("");
    setLastname("");
    setVacation("AV");
  };

  const addNewStudent = async () => {
    try {
      setIsLoading(true);
      const Response = await ApiClient.post({
        url: "/api/students/new",
        data: { firstname, middlename, lastname, vacation },
        token: currentUser?.accessToken,
      });
      if (Response) {
        closeModal(false);
        resetStates();
        Modal.success({
          title: "Success!",
          content: "Apprenant enregistré avec success!",
          centered: true,
          okType: "default",
        });
        await getAllStudents();
        router.push("/dashboard/apprenants");
      }
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
      Modal.error({
        centered: true,
        title: "error",
        okType: "default",
        content:
          "Une erreur est survenu lors de l'enregistrement de l'apprenant !",
      });
    }
  };

  return (
    <form
      className=" flex flex-col gap-6 "
      onSubmit={async (e) => {
        e.preventDefault();
        await addNewStudent();
      }}
    >
      <div className="flex flex-col text-start text-sm gap-4 min-w-[300px] w-full ">
        <div className=" flex flex-col gap-2 ">
          <input
            type="text"
            required={true}
            placeholder="Nom"
            className="input-st"
            value={firstname}
            onChange={(e) => {
              setFirstname(e.target.value);
            }}
          />
        </div>
        <div className=" flex flex-col gap-2 ">
          <input
            type="text"
            required={true}
            placeholder="Post-nom"
            value={middlename}
            className="input-st"
            onChange={(e) => {
              setMiddlename(e.target.value);
            }}
          />
        </div>
        <div className=" flex flex-col gap-2 ">
          <input
            type="text"
            required={true}
            value={lastname}
            placeholder="Prénom"
            className="input-st"
            onChange={(e) => {
              setLastname(e.target.value);
            }}
          />
        </div>
        <div>
          <div className=" flex gap-2 flex-col ">
            <select
              name=""
              onChange={(e) => {
                setVacation(e.target.value);
              }}
              value={vacation}
              className="input-st"
              id=""
            >
              {" "}
              <option value="AV">Avant midi</option>{" "}
              <option value="AP">Après midi</option>{" "}
            </select>
          </div>
        </div>
      </div>
      <div className=" flex  justify-center items-center gap-5  w-full">
        <button
          onClick={() => {
            closeModal(false);
            resetStates();
          }}
          disabled={isLoading}
          type="button"
          className={`flex items-center justify-center gap-3 w-full text-base h-10 rounded-lg border-[1px] border-main_color bg-white ${
            isLoading && "bg-main_color/50"
          } hover:bg-main_color hover:text-white transition-all duration-500 font-bold text-main_color active:bg-black`}
        >
          <span>Annuler</span>{" "}
        </button>
        <button
          type="submit"
          className={`flex items-center justify-center gap-3 w-full text-base h-10 rounded-lg bg-main_color ${
            isLoading && "bg-main_color/50"
          } hover:bg-main_color/50 transition-all duration-500 font-bold text-white active:bg-black`}
        >
          <span>Ajouter</span>{" "}
          {isLoading && <AiOutlineLoading3Quarters className="animate-spin" />}
        </button>
      </div>
    </form>
  );
};

export default NewStudentForm;
