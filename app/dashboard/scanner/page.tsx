"use client";

import { ApiClient } from "@/helpers/apiClient";
import { attendacesAtom } from "@/recoil/atoms/attendance";
import { loaderState } from "@/recoil/atoms/loader";
import { getAccessTokenSelector } from "@/recoil/selectors/currentUser/accessToken";
import { QrScanner } from "@yudiel/react-qr-scanner";
import { Divider, Modal } from "antd";
import { usePathname } from "next/navigation";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useRecoilState, useRecoilValue } from "recoil";

const Scanner = () => {
  const [attendances, setAttendances] = useRecoilState(attendacesAtom);
  const token = useRecoilValue(getAccessTokenSelector);
  const [scanned, setScanned] = useState<boolean>(false);
  const [loader, setLoader] = useRecoilState<boolean>(loaderState);

  const getAllAttendance = async () => {
    try {
      setLoader(true);
      const Response = await ApiClient.get({
        url: "/api/attendance",
        token,
      });
      if (Response) {
        setLoader(false);

        console.log("All Attendances = ", Response.data?.data);
        await setAttendances(Response.data?.data);
      }
    } catch (error) {
      setLoader(false);

      console.log(error);
    }
  };

  const addPresence = async (id: string) => {
    try {
      const Response = await ApiClient.put({
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
          onOk: () => {
            setScanned(false);
          },
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
    <div className=" w-full h-full flex justify-center items-center ">
      <div className="w-[30vw] h-[30vw] flex justify-center items-center">
        {!scanned ? (
          <QrScanner
            onDecode={(result) => {
              setScanned(true);
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
        ) : (
          <div>Loading ...</div>
        )}
      </div>
    </div>
  );
};

export default Scanner;
