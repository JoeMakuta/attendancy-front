"use client";
import React, { useState } from "react";
import type { MenuProps } from "antd";
import { Breadcrumb, Layout, Menu, theme } from "antd";
import {
  AiOutlineDesktop,
  AiOutlineFile,
  AiOutlinePieChart,
  AiOutlineTeam,
  AiOutlineUser,
} from "react-icons/ai";
import MyHeader from "@/components/header/header";

const { Header, Content, Footer, Sider } = Layout;

type MenuItem = Required<MenuProps>["items"][number];

function getItem(
  label: React.ReactNode,
  key: React.Key,
  icon?: React.ReactNode,
  children?: MenuItem[]
): MenuItem {
  return {
    key,
    icon,
    children,
    label,
  } as MenuItem;
}

const items: MenuItem[] = [
  getItem("Option 1", "1", <AiOutlinePieChart />),
  getItem("Option 2", "2", <AiOutlineDesktop />),
  getItem("User", "sub1", <AiOutlineUser />, [
    getItem("Tom", "3"),
    getItem("Bill", "4"),
    getItem("Alex", "5"),
  ]),
  getItem("Team", "sub2", <AiOutlineTeam />, [
    getItem("Team 1", "6"),
    getItem("Team 2", "8"),
  ]),
  getItem("Files", "9", <AiOutlineFile />),
];

const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
  const [collapsed, setCollapsed] = useState(false);
  const {
    token: { colorBgContainer },
  } = theme.useToken();

  return (
    <main>
      <MyHeader />
      <div className=" flex justify-center items-center w-[100vw] h-[100vh] pt-16">
        {children}
      </div>
    </main>
  );
};
export default DashboardLayout;
