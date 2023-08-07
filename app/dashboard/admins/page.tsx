"use client";

import { useRecoilState, useRecoilValue } from "recoil";
import { usersState } from "@/recoil/atoms/users";
import { Button, Modal, message } from "antd";
import { ColumnsType } from "antd/es/table";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { FiEdit, FiPlusCircle } from "react-icons/fi";
import { Table } from "antd";
import { useEffect, useState } from "react";
import { ApiClient } from "@/helpers/apiClient";
import { getAccessTokenSelector } from "@/recoil/selectors/currentUser/accessToken";
import { IResponse } from "@/types/global";
import { AxiosResponse } from "axios";
import { getCurrentUserSelector } from "@/recoil/selectors/currentUser/user";
import { AdminModalPortal, IAdminForm } from "@/helpers/adminModal";
import { MdOutlineDelete } from "react-icons/md";
import AdminModalForm from "@/components/users/modalForm";
import { useRouter } from "next/navigation";
import { currentUserState } from "@/recoil/atoms/currentUser";

export default function Users(): JSX.Element {
  const [admins, setAdmins] = useRecoilState(usersState);
  const token = useRecoilValue(getAccessTokenSelector);
  const router = useRouter()
  const [currentUser, setCurrentUser] = useRecoilState(currentUserState);
  const user = useRecoilValue(getCurrentUserSelector);
  const [adminModal, setAdminModal] = useState<IAdminForm>({
    form: {
      name: "",
      email: "",
      password: "",
      newPassword : "",
      confirmPassword: "",
    },
    action: "Ajouter un administrateur",
    loading: false,
    showModal: false,
    adminId: "",
  });

  const adminModalPortal = new AdminModalPortal(
    adminModal,
    setAdminModal,
    token
  );

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

  const columns: ColumnsType<{
    _id: string;
    name: string;
    email: string;
  }> = [
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
        <h1 className=" font-bold text-2xl ">Tous les administrateurs</h1>
        <button
          onClick={() => {
            setAdminModal({
              ...adminModal,
              action: "Ajouter un administrateur",
              showModal: true,
            });
          }}
          className={`p-4 font-bold bg-white rounded-md text-main_color border border-main_color flex justify-center items-center gap-2 self-start h-10 hover:bg-main_color hover:text-white transition-all 
         
          `}
        >
          <FiPlusCircle size={"20"} />
          <span className="font-bold">Ajouter</span>
        </button>
      </div>

      <div className="w-full">
        <AdminModalForm router={router} currentUser={currentUser} userStateSetter={setCurrentUser} adminModalForm={adminModalPortal} />
        <Table
          columns={columns}
          scroll={{ y: "50vh" }}
          dataSource={admins.filter((el) => el.name != user.name)}
        />
        <div className="w-full">
          <h1 className=" font-bold text-2xl ">Moi</h1>
          <Table
            pagination={false}
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
                          adminId: record._id,
                          action: "Modifier mon profil",
                          showModal: true,
                          form: {
                            ...adminModal.form,
                            name: record.name,
                            email: record.email,
                          },
                        });
                      }}
                      className=" text-main_color  hover:bg-white hover:text-red-600 "
                    >
                      <FiEdit />
                    </Button>
                    <Button
                      onClick={() => {
                        setAdminModal({
                          ...adminModal,
                          adminId: record._id,
                          action: "Modifier mon mot de passe",
                          showModal: true,
                          form: {
                            ...adminModal.form,
                            name: record.name,
                            email: record.email,
                          },
                        });
                      }}
                      className=" text-amber-500 flex items-center justify-center gap-1  hover:bg-white hover:text-red-600 "
                    >
                      <FiEdit className=" text-xs" /> Mot de pass
                    </Button>
                    <Button
                      onClick={() =>
                        adminModalPortal.deleteAccount(
                          admins.filter((el) => el.name == user.name)[0]
                            ._id,
                          token,
                          router
                        )
                      }
                      className=" text-red-600 flex items-center justify-center gap-1  hover:bg-white hover:text-red-600 "
                    >
                      <MdOutlineDelete className=" text-lg" />
                    </Button>
                  </div>
                ),
              },
            ]}
            dataSource={admins.filter((el) => el.name == user.name)}
          />
        </div>
      </div>
    </div>
  );
}
