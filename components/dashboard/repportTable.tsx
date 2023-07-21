import React, { useState } from "react";
import { Button, Modal, Radio, Space, Table, Tag } from "antd";
import type { ColumnsType, TableProps } from "antd/es/table";
import type {
  ExpandableConfig,
  TableRowSelection,
} from "antd/es/table/interface";
import { BiSortDown } from "react-icons/bi";
import { studentsAtoms } from "@/recoil/atoms/students";
import { useRecoilState, useRecoilValue } from "recoil";
import { IStudent, IStudentAttendance, IVacation } from "@/types/global";
import {
  MdOutlineViewDay,
  MdTableView,
  MdViewColumn,
  MdViewList,
} from "react-icons/md";
import { FiDelete, FiEdit } from "react-icons/fi";
import { AiOutlineDelete, AiOutlineLoading3Quarters } from "react-icons/ai";
import { HiEye } from "react-icons/hi2";
import { IAttendance } from "@/types/global";
import { attendacesAtom } from "@/recoil/atoms/attendance";

interface DataType {
  status: "ABSENT" | "PRESENT";
  lastname: string;
  firstname: string;
  middlename: string;
  vacation: "AP" | "AV";
}

const RepportTable = ({ vac }: { vac: "AP" | "AV" }) => {
  const [attendances, setAttendances] = useRecoilState(attendacesAtom);
  const [rowSelection, setRowSelection] = useState<
    TableRowSelection<IStudentAttendance> | undefined
  >({});
  const [ellipsis, setEllipsis] = useState(false);
  const [initLoader, setInitLoader] = useState(false);
  const [presenceStatut, setPresenceStatut] = useState<"ABSENT" | "PRESENT">();
  const [currentStudent, setCurrentStudent] = useState("");
  const [showModal1, setShowModal1] = useState(false);

  const columns: ColumnsType<IStudentAttendance> = [
    {
      title: "Prénom",
      dataIndex: "student",
      render: (data: IStudent) => {
        return <div>{data?.lastname}</div>;
      },
      sorter: true,
    },
    {
      title: "Nom",
      dataIndex: "student",
      render: (data: IStudent) => {
        return <div>{data?.firstname}</div>;
      },
    },
    {
      title: "Post-nom",
      dataIndex: "student",
      render: (data: IStudent) => {
        return <div>{data?.lastname}</div>;
      },
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
      render: (text, record) =>
        record.student ? (
          <Tag color={text == "PRESENT" ? "green" : "red"}>
            {text == "PRESENT" ? "Présent(e)" : "Absent(e)"}
          </Tag>
        ) : null,
      onFilter: (value, record) => record.status.indexOf(value as string) === 0,
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
              setShowModal1(true);
              setCurrentStudent(record.student?.lastname);
              setPresenceStatut(record?.status);
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

  const tableProps: TableProps<IStudentAttendance> = {
    bordered: true,
    loading: attendances ? false : true,
    size: "middle",
    showHeader: true,
    rowSelection,
    pagination: { position: ["bottomRight"] },
    columns: tableColumns,
    dataSource:
      attendances[attendances.length - (vac == "AP" ? 2 : 1)]?.students,
    scroll: { y: "60vh" },
    // rowClassName : (record) => record.student?
  };

  return (
    <div>
      <Table {...tableProps} />
      <Modal
        centered
        title={"Modifier la présence de " + currentStudent}
        open={showModal1}
        width={400}
        onCancel={() => setShowModal1(false)}
        footer={[
          <div className=" flex gap-3 justify-end " key={"b1"}>
            <button
              onClick={() => {
                setShowModal1(false);
              }}
              type="button"
              className={`flex items-center justify-center p-3 text-base h-10 rounded-lg border-[1px] border-main_color bg-white ${
                initLoader && "bg-main_color/50"
              } hover:bg-main_color hover:text-white transition-all duration-500 font-bold text-main_color active:bg-black`}
            >
              <span>Annuler</span>{" "}
            </button>
            <button
              className={`flex items-center justify-center gap-3  p-3 text-base h-10 rounded-lg bg-main_color ${
                initLoader && "bg-main_color/50"
              } hover:bg-main_color/50 transition-all duration-500 font-bold text-white active:bg-black`}
              onClick={() => {
                console.log("Update presence.");
              }}
            >
              {initLoader && (
                <AiOutlineLoading3Quarters
                  size={"20"}
                  className="animate-spin"
                />
              )}
              <span>Ok</span>{" "}
            </button>
          </div>,
        ]}
      >
        <Radio.Group
          onChange={(e) => setPresenceStatut(e.target.value)}
          value={presenceStatut}
          size="large"
        >
          <Radio value={"PRESENT"}>
            <Tag color={"green"}>{"Présent(e)"}</Tag>
          </Radio>
          <Radio value={"ABSENT"}>
            <Tag color={"red"}>{"Absent(e)"}</Tag>
          </Radio>
        </Radio.Group>
      </Modal>
      ;
    </div>
  );
};

export default RepportTable;
