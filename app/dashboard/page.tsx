"use client";

import { userSelector } from "@/recoil/selectors/currentUser/user";
import { useRecoilState, useRecoilValue } from "recoil";

const Dashboard: React.FC = () => {
  const user = useRecoilValue(userSelector);
  return <div>Dashboard Home ! Welcome {user.name}</div>;
};

export default Dashboard;
