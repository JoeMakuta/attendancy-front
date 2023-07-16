import React, { useState } from "react";
import { Button, Space, Table, Tag } from "antd";
import type { ColumnsType, TableProps } from "antd/es/table";
import type {
  ExpandableConfig,
  TableRowSelection,
} from "antd/es/table/interface";
import { BiSortDown } from "react-icons/bi";
import { studentsAtoms } from "@/recoil/atoms/students";
import { useRecoilValue } from "recoil";
import { IStudent } from "@/types/global";
import { FiEdit } from "react-icons/fi";
import { AiFillExclamationCircle, AiOutlineDelete } from "react-icons/ai";
import { HiExclamationCircle, HiEye } from "react-icons/hi2";
import { Modal } from "antd";
import { TbExclamationMark } from "react-icons/tb";

const { confirm } = Modal;

interface DataType {
  key: number;
  name: string;
  age: number;
  address: string;
  description: string;
}

const showDeleteConfirm = () => {
  confirm({
    title: "Voulez-vous supprimez l'apprenant ?",
    content:
      "L'apprenant sera supprimé définitivement et ne pourra pas etre restauré!",
    okText: "Oui",
    okType: "danger",
    cancelText: "Non",
    onOk() {
      console.log("OK");
    },
    onCancel() {
      console.log("Cancel");
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
    onFilter: (value, record) => record.vacation.indexOf(value as string) === 0,
  },

  {
    title: "Action",
    key: "action",
    render: () => (
      <div className=" flex gap-1 ">
        <Button
          type="default"
          onClick={() => {
            showDeleteConfirm();
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

const StudentRepportTable = () => {
  const students = useRecoilValue(studentsAtoms);
  const [rowSelection, setRowSelection] = useState<
    TableRowSelection<IStudent> | undefined
  >({});

  const [ellipsis, setEllipsis] = useState(false);

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
