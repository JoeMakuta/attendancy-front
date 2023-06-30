"use client";

import {
  AiFillEyeInvisible,
  AiFillEye,
  AiOutlineEye,
  AiOutlineUser,
} from "react-icons/ai";
import { FaRegUser } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
import { BsFacebook } from "react-icons/bs";
import { useState } from "react";

export const inputStyles =
  " h-12 p-3 w-[100%] bg-slate-200 focus:border-[1px]   rounded-lg outline-none focus:ring-[#00FF51]/30 focus:ring-2 focus:shadow-[0px_0px_10px_1px_#00FF51] border-[1px] border-[#000]/10 transition-all flex justify-center items-center ";

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [authenticated, setAuthenticated] = useState(false);

  return (
    <form
      className=" backdrop-blur-md text-center  shadow-gray-400  h-fit text-xs rounded-3xl flex items-center justify-around flex-col gap-4 max-w-[400px] transition-all w "
      onSubmit={(e) => {
        e.preventDefault();
      }}
    >
      <div className="flex flex-col justify-center items-center  pt-0 gap-3">
        <p className=" font-medium text-4xl ">Attendancy App</p>
        <p className=" text-gray-600 text-xs ">
          Enter your credentials to access your account
        </p>
      </div>

      <div className="flex flex-col text-start text-sm gap-4 w-full ">
        <div className=" flex flex-col gap-2 ">
          {/* <label htmlFor="">Email :</label> */}
          <input
            type="email"
            required={true}
            placeholder="Email"
            className={inputStyles}
          />
        </div>
        <div>
          <div className=" flex gap-2 flex-col ">
            {/* <label htmlFor="">Password : </label> */}
            <input
              required={true}
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              className={inputStyles + " min-w-full"}
            />
            <button
              className="relative self-end bottom-[42px] right-4"
              type="button"
              onClick={() => {
                showPassword ? setShowPassword(false) : setShowPassword(true);
              }}
            >
              {showPassword ? (
                <AiFillEyeInvisible size={25} />
              ) : (
                <AiFillEye size={25} />
              )}
            </button>
          </div>
        </div>
      </div>
      <div className=" flex flex-col justify-center items-center gap-5  w-full">
        <button
          type="submit"
          className=" w-full text-base h-10 rounded-lg bg-main_color hover:bg-main_color/50 transition-all duration-500 font-bold text-white active:bg-black "
        >
          Se connecter
        </button>
        {/* <p className=" flex gap-2 text-base">
          <p>{"Don't have an account ?"}</p>
          <button type="button" className="text-main_color font-bold ">
            Signup
          </button>
        </p> */}
        <div className=" flex justify-center  ">
          <p className=" text-main_color cursor-pointer">Forgot password?</p>
        </div>
      </div>
    </form>
  );
};

export default Login;
