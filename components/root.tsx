"use client";
import { RecoilRoot } from "recoil";

const MyRecoilRoot = ({ children }: { children: React.ReactNode }) => {
  return <RecoilRoot>{children}</RecoilRoot>;
};

export default MyRecoilRoot;
