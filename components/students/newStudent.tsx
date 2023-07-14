"use client";
import { useState } from "react";
import { AiOutlineLoading3Quarters } from "react-icons/ai";

const NewStudentForm = () => {
  const [isLoading, setIsLoading] = useState(false);
  return (
    <form className=" flex flex-col gap-6 ">
      <div className="flex flex-col text-start text-sm gap-4 min-w-[300px] w-full ">
        <div className=" flex flex-col gap-2 ">
          <input
            type="text"
            required={true}
            placeholder="Nom"
            className="input-st"
            onChange={(e) => {}}
          />
        </div>
        <div className=" flex flex-col gap-2 ">
          <input
            type="text"
            required={true}
            placeholder="Post-nom"
            className="input-st"
            onChange={(e) => {}}
          />
        </div>
        <div className=" flex flex-col gap-2 ">
          <input
            type="text"
            required={true}
            placeholder="Prénom"
            className="input-st"
            onChange={(e) => {}}
          />
        </div>
        <div>
          <div className=" flex gap-2 flex-col ">
            <select name="" className="input-st" id="">
              {" "}
              <option value="AV">Avant midi</option>{" "}
              <option value="AP">Après midi</option>{" "}
            </select>
          </div>
        </div>
      </div>
      <div className=" flex flex-col justify-center items-center gap-5  w-full">
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
