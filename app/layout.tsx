import MyRecoilRoot from "@/components/root";
import "./globals.css";
import { Inter } from "next/font/google";
import { RecoilRoot } from "recoil";

const inter = Inter({ subsets: ["latin"] });
export const metadata = {
  title: "Attendancy",
  description: "Welcom to the attendacy app",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <MyRecoilRoot>
        <body className={inter.className}>{children}</body>
      </MyRecoilRoot>
    </html>
  );
}
