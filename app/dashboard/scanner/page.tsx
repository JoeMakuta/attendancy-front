"use client";

import { ApiClient } from "@/helpers/apiClient";
import { attendacesAtom } from "@/recoil/atoms/attendance";
import { getAccessTokenSelector } from "@/recoil/selectors/currentUser/accessToken";
import { QrScanner } from "@yudiel/react-qr-scanner";
import { Modal } from "antd";
import { usePathname } from "next/navigation";
import { useRouter } from "next/navigation";
import { useRecoilState, useRecoilValue } from "recoil";
const Scanner = () => {
  const [attendances, setAttendances] = useRecoilState(attendacesAtom);
  const token = useRecoilValue(getAccessTokenSelector);

  const getAllAttendance = async () => {
    try {
      const Response = await ApiClient.get({
        url: "/api/attendance",
        token,
      });
      if (Response) {
        console.log("All Attendances = ", Response.data?.data);
        await setAttendances(Response.data?.data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const addPresence = async (id: string) => {
    Modal.success({
      title: "Success",
      content: "Présence enregistré avec success!",
      centered: true,
      okType: "default",
    });
    try {
      const Response = await ApiClient.update({
        url: "/api/attendance/presence/" + id,
        data: {},
        token,
      });
      if (Response) {
        Modal.success({
          title: "Success",
          content: "Présence enregistré avec success!",
          centered: true,
          okType: "default",
        });
        await getAllAttendance();
      }
    } catch (error) {
      Modal.error({
        title: "Erreur",
        content: "La présence n'a pas pu étre enregistré!",
        centered: true,
        okType: "default",
      });
    }
  };

  return (
    <div className="w-[40vw] h-[40vw] flex justify-center items-center">
      <QrScanner
        onDecode={(result) => {
          addPresence(result);
        }}
        onError={(error) =>
          Modal.error({
            title: "Erreur",
            content: error?.message,
            centered: true,
            okType: "default",
          })
        }
      />
    </div>
  );
};

export default Scanner;
