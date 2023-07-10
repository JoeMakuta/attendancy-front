"use client";
import { useState } from "react";

const Signup = () => {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div>
      <form
        className=" backdrop-blur-md text-center  shadow-gray-400  h-fit text-xs rounded-3xl flex items-center justify-around flex-col gap-4 max-w-[400px] transition-all w "
        onSubmit={(e) => {
          e.preventDefault();
        }}
      >
        <div className="flex flex-col justify-center items-center  pt-0 gap-3">
          <p className=" font-medium text-2xl ">Ajouter un administrateur</p>
        </div>

        <div className="flex flex-col text-start text-sm gap-4 w-full ">
          <div className=" flex flex-col gap-2 ">
            {/* <label htmlFor="">Name :</label> */}
            <input
              type="text"
              required={true}
              placeholder="Noms"
              className="input-st"
            />
          </div>
          <div className=" flex flex-col gap-2 ">
            {/* <label htmlFor="">Email :</label> */}
            <input
              type="email"
              required={true}
              placeholder="Email"
              className="input-st"
            />
          </div>
        </div>
        <div className=" flex flex-col justify-center items-center gap-5  w-full">
          <button
            type="submit"
            className=" w-full text-base h-10 rounded-lg bg-main_color hover:bg-main_color/50 transition-all duration-500 font-bold text-white active:bg-black "
          >
            Ajouter
          </button>
          {/* <p className=" flex gap-2 text-base">
            <p>{"Have an account ?"}</p>
            <button type="button" className="text-main_color font-bold ">
              Login
            </button>
          </p> */}
        </div>
      </form>
    </div>
  );
};

export default Signup;
