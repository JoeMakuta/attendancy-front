import React, { useCallback, useEffect, useState } from "react";
import { Button, QRCode, Table, Tag } from "antd";
import type { ColumnsType, TableProps } from "antd/es/table";
import type { TableRowSelection } from "antd/es/table/interface";
import { studentsAtoms } from "@/recoil/atoms/students";
import { useRecoilState, useRecoilValue } from "recoil";
import { IStudent } from "@/types/global";
import { FiEdit } from "react-icons/fi";
import { AiOutlineDelete, AiOutlineLoading3Quarters } from "react-icons/ai";
import { HiEye } from "react-icons/hi2";
import { Modal } from "antd";
import { ApiClient } from "@/helpers/apiClient";
import { currentUserState } from "@/recoil/atoms/currentUser";
import { useRouter } from "next/navigation";
import { getAccessTokenSelector } from "@/recoil/selectors/currentUser/accessToken";
import { loaderState } from "@/recoil/atoms/loader";

const { confirm } = Modal;

interface DataType {
  key: number;
  name: string;
  age: number;
  address: string;
  description: string;
}

const StudentRepportTable = () => {
  const [students, setStudents] = useRecoilState(studentsAtoms);
  const currentUser = useRecoilValue(currentUserState);
  const [loader, setLoader] = useRecoilState<boolean>(loaderState);

  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [open1, setOpen1] = useState(false);
  const [loadingModal, setLoadingModal] = useState(false);
  const [qrCodeValue, setQrCodeValue] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [currentStudent, setCurrentStudent] = useState<IStudent>({
    _id: "",
    firstname: "",
    lastname: "",
    middlename: "",
    vacation: "AV",
  });
  const token = useRecoilValue(getAccessTokenSelector);

  const [ellipsis, setEllipsis] = useState(false);

  const getAllStudents = useCallback(async () => {
    try {
      setLoader(true);
      const Response = await ApiClient.get({
        url: "/api/students",
        token: currentUser?.accessToken,
      });

      if (Response) {
        await setStudents(Response.data?.data);
      }
      setLoader(false);
    } catch (error) {
      setLoader(false);
    }
  }, [currentUser, setLoader, setStudents]);

  useEffect(() => {
    getAllStudents();
  }, [getAllStudents]);

  const showDeleteConfirm = (id: string) => {
    confirm({
      title: "Voulez-vous supprimer l'apprenant ?",
      content: "L'apprenant sera supprimé définitivement !",
      okText: "Oui",
      okType: "danger",
      cancelText: "Non",
      async onOk() {
        try {
          const Response = await ApiClient.delete({
            token: currentUser.accessToken,
            url: `/api/students/delete/${id}`,
          });
          if (Response) {
            Modal.success({
              title: "Success!",
              content: "Apprenant supprimé avec success!",
              centered: true,
              okType: "default",
            });

            await getAllStudents();

            router.push("/dashboard/apprenants");
          }
        } catch (error) {
          Modal.error({
            title: "error",
            centered: true,
            content: "Une erreur est survenu lors de la suppression!",
            okType: "default",
          });
        }
      },
      centered: true,
    });
  };

  const modifyStudent = (student: IStudent) => {
    setOpen1(true);
    setCurrentStudent(student);
  };

  const submitUpdateForm = async () => {
    setIsLoading(true);
    try {
      const data: {
        __v?: string;
        _id?: string;
        firstname: string;
        middlename: string;
        lastname: string;
        vacation: "AP" | "AV";
      } = { ...currentStudent };
      delete data._id;
      delete data.__v;
      const Response = await ApiClient.put({
        token,
        data: data,
        url: `/api/students/update/${currentStudent._id}`,
      });
      if (Response) {
        setIsLoading(false);
        Modal.success({
          title: "Success",
          content: "L'apprennant a été modifié avec success!",
          okType: "default",
          centered: true,
        });
        setOpen1(false);
        await getAllStudents();
      }
    } catch (error) {
      setIsLoading(false);
      Modal.error({
        title: "Erreur",
        centered: true,
        content: "L'apprennant n'a pas pu etre modifié !",
        okType: "default",
      });
    }
  };

  const showStudentDetails = async (student: IStudent) => {
    await setOpen(true);
    await setLoadingModal(true);
    await setCurrentStudent(student);
    await setQrCodeValue(student._id);
    await setLoadingModal(false);
  };

  const downloadQRCode = () => {
    const canvas = document
      .getElementById("myqrcode")
      ?.querySelector<HTMLCanvasElement>("canvas");
    if (canvas) {
      const url = canvas.toDataURL("image/jpeg", 10);
      const a = document.createElement("a");
      a.download = `${currentStudent.firstname + currentStudent.lastname}.jpeg`;
      a.href = url;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
    }
  };

  const columns: ColumnsType<IStudent> = [
    {
      title: "Prénom",
      dataIndex: "lastname",
      defaultSortOrder: "ascend",
      sorter: (a, b) =>
        a?.lastname.toLowerCase().charCodeAt(0) -
        b?.lastname.toLowerCase().charCodeAt(0),
    },
    {
      title: "Nom",
      dataIndex: "firstname",
    },
    {
      title: "Post-nom",
      dataIndex: "middlename",
    },
    {
      title: "Vacation",
      dataIndex: "vacation",
      render: (text) => {
        return (
          <Tag color={text == "AP" ? "blue" : "green"}>
            {text == "AP" ? "Après-midi" : "Avant-midi"}
          </Tag>
        );
      },
      filters: [
        {
          text: "Avant midi",
          value: "AV",
        },
        {
          text: "Après midi",
          value: "AP",
        },
      ],
      onFilter: (value, record) =>
        record.vacation.indexOf(value as string) === 0,
    },

    {
      title: "Action",
      key: "action",
      render: (text, record, index) => (
        <div className=" flex gap-1 ">
          <Button
            type="default"
            onClick={() => {
              showDeleteConfirm(record._id);
            }}
            className=" text-red-600 border border-red-600 hover:bg-white hover:text-red-600 "
          >
            <AiOutlineDelete />
          </Button>

          <Button
            onClick={() => {
              showStudentDetails(record);
            }}
            className=" text-white bg-main_color/70  hover:bg-white hover:text-red-600 "
          >
            <HiEye />
          </Button>
          <Button
            onClick={() => {
              modifyStudent({ ...record });
            }}
            className=" text-main_color  hover:bg-white hover:text-red-600 "
          >
            <FiEdit />
          </Button>
        </div>
      ),
    },
  ];

  const tableColumns = columns.map((item) => ({ ...item, ellipsis }));

  const tableProps: TableProps<IStudent> = {
    bordered: true,
    loading: loader,
    size: "middle",
    showHeader: true,
    pagination: { position: ["bottomRight"] },
    columns: tableColumns,
    dataSource: students,
    scroll: { y: "100%" },
  };

  return (
    <div>
      <Table {...tableProps} />
      <Modal
        centered
        title="Details de l'apprenant"
        open={open}
        width={800}
        onCancel={() => {
          setOpen(false);
        }}
        footer={[
          <Button
            key="back"
            className=" bg-main_color text-white "
            onClick={() => {
              setOpen(false);
            }}
          >
            OK
          </Button>,
        ]}
      >
        {loadingModal ? (
          <div>Loading ...</div>
        ) : (
          <div className=" flex gap-6">
            <div id="myqrcode">
              <QRCode
                size={400}
                value={qrCodeValue}
                style={{ marginBottom: 16 }}
                bgColor="white"
              />
              {qrCodeValue !== "" ? (
                <Button
                  className=" border-[2px] border-main_color text-main_color"
                  onClick={downloadQRCode}
                >
                  Télécharger
                </Button>
              ) : null}
            </div>
            <div className=" flex flex-col gap-4 ">
              <h1 className=" font-bold  ">Details : </h1>
              <div className=" flex flex-col  ">
                <p>
                  Identifiant :{" "}
                  <span className="font-bold">{currentStudent._id}</span>
                </p>
                <p>
                  Nom :
                  <span className="font-bold">{currentStudent.firstname}</span>
                </p>
                <p>
                  Post-nom :{" "}
                  <span className="font-bold">{currentStudent.middlename}</span>
                </p>
                <p>
                  Prénom :{" "}
                  <span className="font-bold">{currentStudent.lastname}</span>
                </p>
                <p>
                  Vacation :{" "}
                  <Tag
                    color={currentStudent.vacation == "AP" ? "blue" : "green"}
                  >
                    {currentStudent.vacation == "AP"
                      ? "Après-midi"
                      : "Avant-midi"}
                  </Tag>
                </p>
              </div>
            </div>
          </div>
        )}
      </Modal>
      <Modal
        centered
        title="Modifier un apprenant"
        open={open1}
        onCancel={() => {
          setOpen1(false);
        }}
        width={400}
        footer={null}
      >
        <form
          className=" flex flex-col gap-6 "
          onSubmit={async (e) => {
            e.preventDefault();
            await submitUpdateForm();
          }}
        >
          <div className="flex flex-col text-start text-sm gap-4 min-w-[300px] w-full ">
            <div className=" flex flex-col gap-2 ">
              <input
                type="text"
                required={true}
                placeholder="Nom"
                value={currentStudent.firstname}
                className="input-st"
                onChange={(e) => {
                  setCurrentStudent({
                    ...currentStudent,
                    firstname: e.target.value,
                  });
                }}
              />
            </div>
            <div className=" flex flex-col gap-2 ">
              <input
                type="text"
                required={true}
                value={currentStudent.middlename}
                placeholder="Post-nom"
                className="input-st"
                onChange={(e) => {
                  setCurrentStudent({
                    ...currentStudent,
                    middlename: e.target.value,
                  });
                }}
              />
            </div>
            <div className=" flex flex-col gap-2 ">
              <input
                type="text"
                required={true}
                placeholder="Prénom"
                value={currentStudent.lastname}
                className="input-st"
                onChange={(e) => {
                  setCurrentStudent({
                    ...currentStudent,
                    lastname: e.target.value,
                  });
                }}
              />
            </div>
            <div>
              <div className=" flex gap-2 flex-col ">
                <select
                  name=""
                  value={currentStudent.vacation}
                  onChange={(e) => {
                    setCurrentStudent({
                      ...currentStudent,
                      vacation: e.target.value as "AP" | "AV",
                    });
                  }}
                  className="input-st"
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
                setOpen1(false);
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
              disabled={isLoading}
              className={`flex items-center justify-center gap-3 w-full text-base h-10 rounded-lg bg-main_color ${
                isLoading && "bg-main_color/50"
              } hover:bg-main_color/50 transition-all duration-500 font-bold text-white active:bg-black`}
            >
              <span>Modifier</span>{" "}
              {isLoading && (
                <AiOutlineLoading3Quarters className="animate-spin" />
              )}
            </button>
          </div>
        </form>
      </Modal>
    </div>
  );
};

export default StudentRepportTable;
