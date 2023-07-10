"use client";
import "./globals.css";
import { Inter } from "next/font/google";
import { RecoilRoot } from "recoil";

const inter = Inter({ subsets: ["latin"] });
// export const metadata = {
//   title: "Attendancy | Dashboard",
//   description: "Welcom to the attendacy app",
// };

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <RecoilRoot>
        <body className={inter.className}>{children}</body>
      </RecoilRoot>
    </html>
  );
}
