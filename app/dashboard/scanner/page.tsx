"use client";

import { QrScanner } from "@yudiel/react-qr-scanner";
import { usePathname } from "next/navigation";
import { useRouter } from "next/navigation";
const Scanner = () => {
  const router = useRouter();
  return (
    <div className="w-[40vw] h-[40vw] flex justify-center items-center">
      <QrScanner
        onDecode={(result) => {
          router.push("/dashboard/scanner/result");
        }}
        onError={(error) => console.log(error?.message)}
      />
    </div>
  );
};

export default Scanner;
