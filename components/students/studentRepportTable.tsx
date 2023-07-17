import React, { useState } from "react";
import { Button, Space, Table, Tag, message } from "antd";
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

  const [ellipsis, setEllipsis] = useState(false);

  const getAllStudents = async () => {
    const Response = await ApiClient.get({
      url: "/api/students",
      token: currentUser?.accessToken,
    });
    if (Response) {
      console.log("All student = ", Response.data?.data);
      await setStudents(Response.data?.data);
    }
  };
  const showDeleteConfirm = (id: string) => {
    confirm({
      title: "Voulez-vous supprimez l'apprenant ?",
      content:
        "L'apprenant sera supprimé définitivement et ne pourra pas etre restauré!",
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
            Modal.info({
              title: "Apprenant supprimé avec success!",
              centered: true,
            });
            await getAllStudents();
            router.push("/dashboard/apprenants");
          }
        } catch (error) {
          message.open({
            key: "notification",
            type: "error",
            content: "Une erreur est survenu lors de la suppression!",
          });
        }
      },

      centered: true,
    });
  };

  const columns: ColumnsType<IStudent> = [
    {
      title: "Id",
      dataIndex: "_id",
    },
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
        return <Tag color={text == "AP" ? "blue" : "green"}>{text}</Tag>;
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

          <Button className=" text-white bg-main_color/70  hover:bg-white hover:text-red-600 ">
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

  return <Table {...tableProps} />;
};

export default StudentRepportTable;
