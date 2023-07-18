import React, { useState } from "react";
import { Button, QRCode, Space, Table, Tag, message } from "antd";
import type { ColumnsType, TableProps } from "antd/es/table";
import type {
  ExpandableConfig,
  TableRowSelection,
} from "antd/es/table/interface";
import { BiSortDown } from "react-icons/bi";
import { studentsAtoms } from "@/recoil/atoms/students";
import { useRecoilState, useRecoilValue } from "recoil";
import { IStudent } from "@/types/global";
import { FiEdit } from "react-icons/fi";
import { AiFillExclamationCircle, AiOutlineDelete } from "react-icons/ai";
import { HiExclamationCircle, HiEye } from "react-icons/hi2";
import { Modal } from "antd";
import { TbExclamationMark } from "react-icons/tb";
import { ApiClient } from "@/helpers/apiClient";
import { currentUserState } from "@/recoil/atoms/currentUser";
import { useRouter } from "next/navigation";
import { setInterval, setTimeout } from "timers/promises";
import { ok } from "assert";
import { getAccessTokenSelector } from "@/recoil/selectors/currentUser/accessToken";

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
  const [rowSelection, setRowSelection] = useState<
    TableRowSelection<IStudent> | undefined
  >({});
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [loadingModal, setLoadingModal] = useState(false);
  const [qrCodeValue, setQrCodeValue] = useState("");
  const [currentStudent, setCurrentStudent] = useState<IStudent>({
    _id: "",
    firstname: "",
    lastname: "",
    middlename: "",
    vacation: "AV",
  });
  const token = useRecoilValue(getAccessTokenSelector);

  const [ellipsis, setEllipsis] = useState(false);

  const getAllStudents = async () => {
    const Response = await ApiClient.get({
      url: "/api/students",
      token: currentUser?.accessToken,
    });
    if (Response) {
      await setStudents(Response.data?.data);
    }
  };

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

  const showStudentDetails = async (id: string) => {
    setOpen(true);
    setLoadingModal(true);
    try {
      const Response = await ApiClient.get({
        url: `/api/students/${id}`,
        token,
      });
      if (Response) {
        setCurrentStudent(Response.data.data);
      }
    } catch (error) {}
    setQrCodeValue(id);
    setLoadingModal(false);
  };

  const downloadQRCode = () => {
    const canvas = document
      .getElementById("myqrcode")
      ?.querySelector<HTMLCanvasElement>("canvas");
    if (canvas) {
      const url = canvas.toDataURL();
      const a = document.createElement("a");
      a.download = "QRCode.png";
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
      sorter: true,
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
              showStudentDetails(record._id);
            }}
            className=" text-white bg-main_color/70  hover:bg-white hover:text-red-600 "
          >
            <HiEye />
          </Button>
          <Button className=" text-main_color  hover:bg-white hover:text-red-600 ">
            <FiEdit />
          </Button>
        </div>
      ),
    },
  ];

  const tableColumns = columns.map((item) => ({ ...item, ellipsis }));

  const tableProps: TableProps<IStudent> = {
    bordered: true,
    loading: students ? false : true,
    size: "middle",
    showHeader: true,
    rowSelection,
    pagination: { position: ["bottomRight"] },
    columns: tableColumns,
    dataSource: students,
    scroll: { y: "55vh", x: 20 },
  };

  return (
    <div>
      <Table {...tableProps} />
      <Modal
        centered
        title="Details de l'apprenant"
        open={open}
        width={800}
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
                size={250}
                value={qrCodeValue}
                style={{ marginBottom: 16 }}
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
    </div>
  );
};

export default StudentRepportTable;
