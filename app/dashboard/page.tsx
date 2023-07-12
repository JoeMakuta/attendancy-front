"use client";
import { userSelector } from "@/recoil/selectors/currentUser/user";
import { useEffect, useState } from "react";
import { useRecoilValue } from "recoil";

interface User {
  email: string;
  name: string;
  password: string;
}

const Dashboard: React.FC = () => {
  const recoilUser = useRecoilValue(userSelector);
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    setUser(recoilUser as User);
  }, []);

  return (
    <div className="">
          Welcome {user?.name}
    </div>
  );
};

export default Dashboard;
