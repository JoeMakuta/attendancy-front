import React, { useState } from "react";
import { Button, Space, Table } from "antd";
import type { ColumnsType, TableProps } from "antd/es/table";
import type {
  ExpandableConfig,
  TableRowSelection,
} from "antd/es/table/interface";
import { BiSortDown } from "react-icons/bi";
import { studentsAtoms } from "@/recoil/atoms/students";
import { useRecoilValue } from "recoil";
import { IStudent } from "@/types/global";
import {
  MdOutlineViewDay,
  MdTableView,
  MdViewColumn,
  MdViewList,
} from "react-icons/md";
import { FiDelete, FiEdit } from "react-icons/fi";
import { AiOutlineDelete } from "react-icons/ai";
import { HiEye } from "react-icons/hi2";

interface DataType {
  key: number;
  name: string;
  age: number;
  address: string;
  description: string;
}

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
        <Button>
          <AiOutlineDelete />
        </Button>
        <Button>
          <HiEye />
        </Button>
        <Button>
          <FiEdit />
        </Button>
      </div>
    ),
  },
];

const RepportTable = () => {
  const students = useRecoilValue(studentsAtoms);
  const [rowSelection, setRowSelection] = useState<
    TableRowSelection<IStudent> | undefined
  >({});
  const [hasData, setHasData] = useState(true);

  const [ellipsis, setEllipsis] = useState(false);

  const tableColumns = columns.map((item) => ({ ...item, ellipsis }));

  const tableProps: TableProps<IStudent> = {
    bordered: true,
    loading: false,
    size: "middle",
    showHeader: true,
    rowSelection,
    pagination: { position: ["bottomRight"] },
    columns: tableColumns,
    dataSource: hasData ? students : [],
    scroll: { y: "55vh", x: 20 },
  };

  return <Table {...tableProps} />;
};

export default RepportTable;
