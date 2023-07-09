"use client";
import axios, { AxiosResponse } from "axios";
import {
  AiFillEyeInvisible,
  AiFillEye,
  AiOutlineLoading3Quarters,
} from "react-icons/ai";
import { useState } from "react";
import { message } from "antd";
import { IResponse, IUser } from "@/types/global";
import { AxiosHelpers } from "@/helpers/axios";
import { useRecoilState } from "recoil";
import { currentUserState } from "@/recoil/atoms/currentUser";
import { useRouter } from "next/navigation";

export const inputStyles =
  " h-12 p-3 w-[100%] bg-slate-200 focus:border-[1px]   rounded-lg outline-none focus:ring-[#E5203D]/30 focus:ring  border-[1px] border-[#000]/10 transition-all flex justify-center items-center ";

const Login = () => {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [currentUser, setCurrentUser] = useRecoilState(currentUserState);

  const LoginUser = async () => {
    setIsLoading(true);
    try {
      const response: AxiosResponse<IResponse<IUser>> = await AxiosHelpers.post(
        {
          url: "/api/auth/login",
          data: {
            email,
            password,
          },
        }
      );

      if (response) {
        setIsLoading(false);
        message.open({
          key: "notification",
          type: "success",
          content: response.data.message,
        });
        response.data.data.user.password = "";
        await setCurrentUser(response.data.data);
        localStorage.setItem("user", JSON.stringify(response.data.data));
        router.push("/dashboard");
      }
    } catch (error) {
      setIsLoading(false);
      message.open({
        key: "notification",
        type: "error",
        content: "error",
      });
    }
  };

  return (
    <form
      className=" backdrop-blur-md text-center  shadow-gray-400  h-fit text-xs rounded-3xl flex items-center justify-around flex-col gap-4 max-w-[400px] transition-all w "
      onSubmit={async (e) => {
        e.preventDefault();
        await LoginUser();
      }}
    >
      <div className="flex flex-col justify-center items-center  pt-0 gap-3">
        <p className=" font-medium text-4xl ">Attendancy</p>
        <p className=" text-gray-600 text-xs ">
          Entrer vos identifiants pour accéder à votre compte
        </p>
      </div>

      <div className="flex flex-col text-start text-sm gap-4 w-full ">
        <div className=" flex flex-col gap-2 ">
          <input
            type="email"
            required={true}
            placeholder="Email"
            className={inputStyles}
            onChange={(e) => {
              setEmail(e.target.value);
            }}
          />
        </div>
        <div>
          <div className=" flex gap-2 flex-col ">
            <input
              required={true}
              type={showPassword ? "text" : "password"}
              placeholder="Mot de pass"
              className={inputStyles + " min-w-full"}
              onChange={(e) => {
                setPassword(e.target.value);
              }}
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
          className={`flex items-center justify-center gap-3 w-full text-base h-10 rounded-lg bg-main_color ${
            isLoading && "bg-main_color/50 cursor-not-allowed"
          } hover:bg-main_color/50 transition-all duration-500 font-bold text-white active:bg-black`}
          disabled={isLoading}
        >
          <span>Se connecter</span>{" "}
          {isLoading && <AiOutlineLoading3Quarters className="animate-spin" />}
        </button>
        <div className=" flex justify-center  ">
          <p className=" text-main_color cursor-pointer">
            Mot de pass oublié ?
          </p>
        </div>
      </div>
    </form>
  );
};

export default Login;
