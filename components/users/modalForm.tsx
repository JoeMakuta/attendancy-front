import { AdminModalPortal } from "@/helpers/adminModal";
import { Modal } from "antd";
import { Dispatch, SetStateAction, useState } from "react";
import {
  AiFillEye,
  AiFillEyeInvisible,
  AiOutlineLoading3Quarters,
} from "react-icons/ai";

interface Props {
  adminModalForm: AdminModalPortal;
}

export default function AdminModalForm({ adminModalForm }: Props): JSX.Element {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const isChangePassword =
    adminModalForm.state.action == "Modifier mon mot de passe";

  function TogglePassword({
    setShow,
    show,
  }: {
    setShow: Dispatch<SetStateAction<boolean>>;
    show: boolean;
  }): JSX.Element {
    return (
      <button
        className=" absolute top-1/2 -translate-y-1/2 right-3"
        type="button"
        onClick={() => {
          show ? setShow(false) : setShow(true);
        }}
      >
        {show ? <AiFillEyeInvisible size={25} /> : <AiFillEye size={25} />}
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
                : () => adminModalForm.updateAdmin(adminModalForm.state.adminId)
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
            <div className=" flex flex-col gap-2 ">
              <label htmlFor="name">
                {isChangePassword ? "Mot de pass" : "Nom"}
              </label>
              <div className=" relative w-full">
                <input
                  type={
                    isChangePassword
                      ? showPassword
                        ? "text"
                        : "password"
                      : "text"
                  }
                  id={isChangePassword ? "password" : "name"}
                  value={
                    isChangePassword
                      ? adminModalForm.state.form.password
                      : adminModalForm.state.form.name
                  }
                  required={true}
                  onChange={(e) =>
                    adminModalForm.handleForm(
                      e,
                      isChangePassword ? "password" : "name"
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
                  />
                )}
              </div>
            </div>
            <div className=" flex flex-col gap-2 ">
              <label htmlFor="email">
                {isChangePassword ? "Confirmez le mot de pass" : "Email"}
              </label>
              <div className=" relative w-full">
                <input
                  type={
                    isChangePassword
                      ? showConfirmPassword
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
                    setShow={setShowConfirmPassword}
                    show={showConfirmPassword}
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
