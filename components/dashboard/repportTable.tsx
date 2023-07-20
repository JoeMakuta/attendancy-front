import React, { useState } from "react";
import { Button, Space, Table } from "antd";
import type { ColumnsType, TableProps } from "antd/es/table";
import type {
  ExpandableConfig,
  TableRowSelection,
} from "antd/es/table/interface";
import { BiSortDown } from "react-icons/bi";
import { studentsAtoms } from "@/recoil/atoms/students";
import { useRecoilState, useRecoilValue } from "recoil";
import { IStudent, IVacation } from "@/types/global";
import {
  MdOutlineViewDay,
  MdTableView,
  MdViewColumn,
  MdViewList,
} from "react-icons/md";
import { FiDelete, FiEdit } from "react-icons/fi";
import { AiOutlineDelete } from "react-icons/ai";
import { HiEye } from "react-icons/hi2";
import { IAttendance } from "@/types/global";
import { attendacesAtom } from "@/recoil/atoms/attendance";

interface DataType {
  key: number;
  name: string;
  age: number;
  address: string;
  description: string;
}

const RepportTable = ({ vac }: { vac: "AP" | "AV" }) => {
  const [attendances, setAttendances] = useRecoilState(attendacesAtom);
  const [rowSelection, setRowSelection] = useState<
    TableRowSelection<IStudent> | undefined
  >({});
  const [ellipsis, setEllipsis] = useState(false);

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
      title: "Status",
      dataIndex: "status",
      filters: [
        {
          text: "Présent",
          value: "PRESENT",
        },
        {
          text: "Absent",
          value: "ABSENT",
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
          {/* <Button
            type="default"
            onClick={() => {
              // showDeleteConfirm(record._id);
            }}
            className=" text-red-600 border border-red-600 hover:bg-white hover:text-red-600 "
          >
            <AiOutlineDelete />
          </Button> */}

          {/* <Button
            onClick={() => {
              // showStudentDetails(record);
            }}
            className=" text-white bg-main_color/70  hover:bg-white hover:text-red-600 "
          >
            <HiEye />
          </Button> */}
          <Button
            onClick={() => {
              // modifyStudent({ ...record });
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
    loading: attendances ? false : true,
    size: "middle",
    showHeader: true,
    rowSelection,
    pagination: { position: ["bottomRight"] },
    columns: tableColumns,
    dataSource:
      attendances[attendances.length - (vac == "AP" ? 1 : 2)]?.students,
    scroll: { y: "60vh" },
  };

  return <Table {...tableProps} />;
};

export default RepportTable;
