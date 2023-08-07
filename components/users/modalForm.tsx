import { AdminModalPortal } from "@/helpers/adminModal";
import { IUser } from "@/types/global";
import { Modal } from "antd";
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context";
import { Dispatch, SetStateAction, useState } from "react";
import {
  AiFillEye,
  AiFillEyeInvisible,
  AiOutlineLoading3Quarters,
} from "react-icons/ai";
import { ObjectType } from "typescript";

interface Props {
  adminModalForm: AdminModalPortal;
  currentUser: IUser;
  userStateSetter : (valOrUpdater: IUser | ((currVal: IUser) => IUser)) => void,
  router : AppRouterInstance
}

export default function AdminModalForm({ adminModalForm, userStateSetter, currentUser, router }: Props): JSX.Element {
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const [showPassword, setShowPassword] = useState({
    old: false,
    new: false,
    confirm: false,
  });

  const isChangePassword =
    adminModalForm.state.action == "Modifier mon mot de passe";

  function TogglePassword({
    setShow,
    show,
    target,
  }: {
    setShow: Dispatch<
      SetStateAction<{ old: boolean; new: boolean; confirm: boolean }>
    >;
    show: { old: boolean; new: boolean; confirm: boolean };
    target: "old" | "new" | "confirm";
  }): JSX.Element {
    return (
      <button
        className=" absolute top-1/2 -translate-y-1/2 right-3"
        type="button"
        onClick={() => {
          setShow({ ...show, [target]: !show[target] });
        }}
      >
        {show[target] ? (
          <AiFillEyeInvisible size={25} />
        ) : (
          <AiFillEye size={25} />
        )}
      </button>
    );
  }

  const onOk = () => {
    adminModalForm.dispatcher({
      ...adminModalForm.state,
      form: {
        name: "",
        email: "",
        password: "",
        newPassword: "",
        confirmPassword: "",
      },
      showModal: false,
    });
  };

  return (
    <Modal
      title={adminModalForm.state.action}
      width={400}
      centered={true}
      open={adminModalForm.state.showModal}
      confirmLoading={adminModalForm.state.loading}
      onOk={onOk}
      onCancel={onOk}
      footer={
        <div className="w-full h-full  items-center flex justify-end">
          <button
            type="submit"
            onClick={
              adminModalForm.state.action == "Ajouter un administrateur"
                ? adminModalForm.createAdmin
                : adminModalForm.state.action == "Modifier mon mot de passe"
                ? () =>
                    adminModalForm.changePassword(adminModalForm.state.adminId, router)
                : () => adminModalForm.updateAdmin(adminModalForm.state.adminId,currentUser, userStateSetter
                  )
            }
            className={`p-4 font-bold bg-white rounded-md text-main_color border border-main_color flex justify-center items-center gap-2 self-start h-10 hover:bg-main_color hover:text-white`}
          >
            {adminModalForm.state.loading && (
              <AiOutlineLoading3Quarters className="animate-spin" />
            )}
            <span>OK</span>{" "}
          </button>
        </div>
      }
    >
      <div className="w-full h-full">
        <form className=" flex flex-col gap-6 ">
          <div className="flex flex-col text-start text-sm gap-4 min-w-[300px] w-full ">
            {isChangePassword && (
              <div className=" flex flex-col gap-2 ">
                <label htmlFor="newPassword">Ancien mot de pass</label>
                <div className=" relative w-full">
                  <input
                    type={
                      isChangePassword
                        ? showPassword.old
                          ? "text"
                          : "password"
                        : "text"
                    }
                    id="newPassword"
                    value={adminModalForm.state.form.password}
                    required={true}
                    onChange={(e) =>
                      adminModalForm.handleForm(e, "password")
                    }
                    placeholder="Entrer votre ancien mot de pass"
                    className="input-st"
                  />
                  {isChangePassword && (
                    <TogglePassword
                      setShow={setShowPassword}
                      show={showPassword}
                      target="old"
                    />
                  )}
                </div>
              </div>
            )}
            <div className=" flex flex-col gap-2 ">
              <label htmlFor={isChangePassword ? "password" : "name"}>
                {isChangePassword ? "Mot de pass" : "Nom"}
              </label>
              <div className=" relative w-full">
                <input
                  type={
                    isChangePassword
                      ? showPassword.new
                        ? "text"
                        : "password"
                      : "text"
                  }
                  id={isChangePassword ? "password" : "name"}
                  value={
                    isChangePassword
                      ? adminModalForm.state.form.newPassword
                      : adminModalForm.state.form.name
                  }
                  required={true}
                  onChange={(e) =>
                    adminModalForm.handleForm(
                      e,
                      isChangePassword ? "newPassword" : "name"
                    )
                  }
                  placeholder={
                    isChangePassword ? "Entre le mot de passe" : "Entrez le nom"
                  }
                  className="input-st"
                />
                {isChangePassword && (
                  <TogglePassword
                    setShow={setShowPassword}
                    show={showPassword}
                    target="new"
                  />
                )}
              </div>
            </div>
            <div className=" flex flex-col gap-2 ">
              <label htmlFor={isChangePassword ? "confirmPassword" : "Email"}>
                {isChangePassword ? "Confirmez le mot de pass" : "Email"}
              </label>
              <div className=" relative w-full">
                <input
                  type={
                    isChangePassword
                      ? showPassword.confirm
                        ? "text"
                        : "password"
                      : "email"
                  }
                  id={isChangePassword ? "confirmPassword" : "Email"}
                  value={
                    isChangePassword
                      ? adminModalForm.state.form.confirmPassword
                      : adminModalForm.state.form.email
                  }
                  required={true}
                  onChange={(e) =>
                    adminModalForm.handleForm(
                      e,
                      isChangePassword ? "confirmPassword" : "email"
                    )
                  }
                  placeholder={
                    isChangePassword
                      ? "Confirmer le mot de pass"
                      : "Entrez l'email"
                  }
                  className="input-st"
                />
                {isChangePassword && (
                  <TogglePassword
                    setShow={setShowPassword}
                    show={showPassword}
                    target="confirm"
                  />
                )}
              </div>
            </div>
          </div>
        </form>
      </div>
    </Modal>
  );
}
