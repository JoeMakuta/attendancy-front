"use client";

import { useRecoilState, useRecoilValue } from "recoil";
import { usersState } from "@/recoil/atoms/users";
import { Button, Modal, message } from "antd";
import { ColumnsType } from "antd/es/table";
import {AiOutlineLoading3Quarters } from "react-icons/ai";
import { FiEdit, FiPlusCircle } from "react-icons/fi";
import { Table } from "antd";
import { useEffect, useState } from "react";
import { ApiClient } from "@/helpers/apiClient";
import { getAccessTokenSelector } from "@/recoil/selectors/currentUser/accessToken";
import { IResponse } from "@/types/global";
import { AxiosResponse } from "axios";
import { getCurrentUserSelector } from "@/recoil/selectors/currentUser/user";
import { AdminModalPortal } from "@/helpers/adminModal";

interface IAdminForm {
  form: {
    name: string;
    email: string;
    password: string;
  };
  action: "Ajouter" | "Enregister";
  loading: boolean;
  showModal: boolean;
  adminId: string;
}

export default function Users(): JSX.Element {
  const [admins, setAdmins] = useRecoilState(usersState);
  const token = useRecoilValue(getAccessTokenSelector);
  const currentUser = useRecoilValue(getCurrentUserSelector);
  const [adminModal, setAdminModal] = useState<IAdminForm>({
    form: {
      name: "",
      email: "",
      password: "",
    },
    action: "Ajouter",
    loading: false,
    showModal: false,
    adminId: "",
  });

  const adminModalPortal = new AdminModalPortal(adminModal , setAdminModal , token)

  useEffect(() => {
    const getAdmins = async () => {
      try {
        const response: AxiosResponse<
          IResponse<{ name: string; email: string; _id: string }[]>
        > = await ApiClient.get({ url: "api/users", token });

        setAdmins(response.data.data);
      } catch (error) {
        message.open({
          key: "notification",
          type: "error",
          content: "Une erreur est survenu lors de la suppression!",
        });
      }
    };

    getAdmins();
  }, [setAdmins, token, adminModal.showModal]);

  const columns: ColumnsType<{ name: string; email: string;  }> = [
    {
      title: "Name",
      dataIndex: "name",
    },
    {
      title: "Email",
      dataIndex: "email",
    },
  ];

  return (
    <div className="w-full h-full">
      <div className="w-full flex items-center justify-between">
        <h2 className=" text-2xl">Admins</h2>
        <Button
          onClick={() => adminModalPortal.showModal(true)}
          className=" flex items-center justify-center gap-3 text-main_color  hover:bg-white hover:text-red-600 "
        >
          <FiPlusCircle size={"20"} />
          <span className="font-bold">Ajouter</span>
        </Button>
      </div>

      <div className="w-full">
        <Modal
          title="Title"
          open={adminModal.showModal}
          confirmLoading={adminModal.loading}
          onCancel={() => {
            setAdminModal({
              ...adminModal,
              form: { name: "", email: "", password: "" },
              showModal: false,
            });
          }}
          footer={
            <div className="w-full h-full  items-center flex justify-end">
              <button
                type="submit"
                onClick={
                  adminModal.action == "Ajouter"
                    ? adminModalPortal.createAdmin
                    : () => adminModalPortal.updateAdmin(adminModal.adminId)
                }
                className={`flex  items-center justify-center gap-3 border p-3 text-base h-10 rounded-lg bg-main_color  hover:bg-main_color/50 transition-all duration-500 font-bold text-white active:bg-black`}
              >
                <span>{adminModal.action}</span>{" "}
                {adminModal.loading && (
                  <AiOutlineLoading3Quarters className="animate-spin" />
                )}
              </button>
            </div>
          }
        >
          <div className="w-full p-3 h-full">
            <form className=" flex flex-col gap-6 ">
              <div className="flex flex-col text-start text-sm gap-4 min-w-[300px] w-full ">
                <div className=" flex flex-col gap-2 ">
                  <input
                    type="text"
                    required={true}
                    onChange={(e) => adminModalPortal.handleForm(e, "name")}
                    placeholder="Nom"
                    className="input-st"
                  />
                </div>
                <div className=" flex flex-col gap-2 ">
                  <input
                    type="email"
                    required={true}
                    onChange={(e) => adminModalPortal.handleForm(e, "email")}
                    placeholder="Email"
                    className="input-st"
                  />
                </div>
              </div>
            </form>
          </div>
        </Modal>
        <Table
          columns={columns}
          dataSource={admins.filter((el) => el.name != currentUser.name)}
        />
        <div className="w-full">
          <span className=" text-lg">Moi</span>
          <Table
            columns={[
              ...columns,
              {
                title: "Action",
                key: "action",
                render: (text, record, index) => (
                  <div className=" flex gap-1 ">
                    <Button
                      onClick={() => {
                        setAdminModal({
                          ...adminModal,
                          adminId: "record._id",
                          action: "Enregister",
                          showModal: true,
                        });
                        console.log(record);
                      }}
                      className=" text-main_color  hover:bg-white hover:text-red-600 "
                    >
                      <FiEdit />
                    </Button>
                  </div>
                ),
              },
            ]}
            dataSource={[
              {
                name: currentUser.name,
                email: currentUser.email,
              },
            ]}
          />
        </div>
      </div>
    </div>
  );
}
