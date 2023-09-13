"use client";
import React from "react";
import { ApiClient } from "@/helpers/apiClient";
import { attendacesAtom } from "@/recoil/atoms/attendance";
import { loaderState } from "@/recoil/atoms/loader";
import { getAccessTokenSelector } from "@/recoil/selectors/currentUser/accessToken";
import { QrScanner } from "@yudiel/react-qr-scanner";
// import { QrReader } from "react-qr-reader";
import { Modal } from "antd";
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

        await setAttendances(Response.data?.data);
      }
    } catch (error) {
      setLoader(false);
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
        const modal_instance = Modal.success({
          title: "Success",
          content: `La présence de ${Response?.data?.message} a été enregistré avec success!`,
          centered: true,
          okType: "default",
          onOk: () => {
            setScanned(false);
          },
        });
        setTimeout(() => {
          modal_instance.destroy();
          setScanned(false);
        }, 1000);
        await getAllAttendance();
      }
    } catch (error) {
      Modal.error({
        title: "Erreur",
        content: "La présence n'a pas pu étre enregistré!",
        centered: true,
        okType: "default",
        onOk: () => {
          setScanned(false);
        },
      });
    }
  };

  return (
    <div className=" w-full h-full flex justify-center items-center ">
      <div className="md:w-[35vw] w-full h-full flex justify-center md:items-center items-start ">
        {!scanned ? (
          <QrScanner
            constraints={{ facingMode: "environment" }}
            onDecode={async (result) => {
              if (!!result) {
                setScanned(true);
                console.log(result);
                addPresence(result);
              }
            }}
            onError={(error) => {
              console.log(error);

              Modal.error({
                title: "Erreur",
                content: error.message,
                centered: true,
                okType: "default",
              });
            }}
          />
        ) : (
          // <QrReader
          //   constraints={{ facingMode: "environment" }}
          //   onResult={(result, error) => {
          //     if (!!result) {
          //       setScanned(true);
          //       console.log(result);
          //       addPresence(result.getText());
          //     }
          //     if (error) {
          //       console.log(error);

          //       Modal.error({
          //         title: "Erreur",
          //         content: error.message,
          //         centered: true,
          //         okType: "default",
          //       });
          //     }
          //   }}
          // />
          <div>Loading ...</div>
        )}
      </div>
    </div>
  );
};

export default Scanner;
