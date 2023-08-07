import { IResponse, IUser } from "@/types/global";
import { Modal, message } from "antd";
import { AxiosResponse } from "axios";
import { ChangeEvent, Dispatch, SetStateAction } from "react";
import { ApiClient } from "./apiClient";
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context";

export interface IAdminForm {
  form: {
    name: string;
    email: string;
    password: string;
    newPassword: string;
    confirmPassword: string;
  };
  action:
    | "Ajouter un administrateur"
    | "Modifier mon profil"
    | "Modifier mon mot de passe";
  loading: boolean;
  showModal: boolean;
  adminId: string;
}

export class AdminModalPortal {
  state: IAdminForm;
  dispatcher: Dispatch<SetStateAction<IAdminForm>>;
  token: string;

  /* ========== Init the modal form portal ======== */

  constructor(
    state: IAdminForm,
    dispatcher: Dispatch<SetStateAction<IAdminForm>>,
    token: string
  ) {
    this.state = state;
    this.dispatcher = dispatcher;
    this.token = token;
  }

  /* --------- Form handler on modal ----------- */

  handleForm = (e: ChangeEvent<HTMLInputElement>, target: string) => {
    this.dispatcher({
      ...this.state,
      form: {
        ...this.state.form,
        [target]: e.target.value,
      },
    });
  };

  /* ---------------- Reset Form handler on modal ----------- */

  resetForm = () => {
    this.dispatcher({
      ...this.state,
      form: {
        name: "",
        email: "",
        password: "",
        confirmPassword: "",
        newPassword: "",
      },
      showModal: false,
      loading: false,
    });
  };

  /* --------- Show or hide the modal ----------- */

  showModal = (value: boolean) => {
    this.dispatcher({ ...this.state, showModal: value });
  };

  /* --------- Set the loading on modal ----------- */

  setModalLoading = (value: boolean) => {
    this.dispatcher({
      ...this.state,
      loading: value,
    });
  };

  /* --------- Create an admin ----------- */

  createAdmin = async () => {
    try {
      this.setModalLoading(true);


      const response: AxiosResponse<
        IResponse<{ name: string; email: string }>
      > = await ApiClient.post({
        url: "api/auth/register",
        token: this.token,
        data: {
          name: this.state.form.name,
          password: this.state.form.name,
          email: this.state.form.email,
        },
      });

      if (response.data.success) {
        this.resetForm();
        message.open({
          key: "notification",
          type: "success",
          content: "Admin ajouté avec succès",
        });
      }
    } catch (error) {
      this.resetForm();
      message.open({
        key: "notification",
        type: "error",
        content: "Une erreur est survenu lors de l'ajout d'un nouveau admin!",
      });
    }
  };

  /* --------- Update an admin ----------- */

  updateAdmin = async (
    id: string,
    currentUser: IUser,
    currentUserSetter: (valOrUpdater: IUser | ((currVal: IUser) => IUser)) => void
  ) => {
    try {
      this.setModalLoading(true);

      const response: AxiosResponse<
        IResponse<{ name: string; email: string }>
      > = await ApiClient.put({
        url: `/api/users/update/${id}`,
        token: this.token,
        data: {
          name: this.state.form.name,
          email: this.state.form.email,
        },
      });

      if (response.data.success) {
        this.resetForm();
        message.open({
          key: "notification",
          type: "success",
          content: "Enregistré avec succès",
        });

        const { name, email } = response.data.data;

        currentUserSetter({
          ...currentUser,
          user: { ...currentUser.user, name, email },
        });
      }
    } catch (error) {
      this.resetForm();
      message.open({
        key: "notification",
        type: "error",
        content: "Une erreur est survenu lors de la mise à jour de votre profil!",
      });
    }
  };

  changePassword = async (id: string, router : AppRouterInstance) => {
    try {
      const isMatch =
        this.state.form.confirmPassword == this.state.form.newPassword;

      this.setModalLoading(true);


      if (isMatch) {
        const response: AxiosResponse<
          IResponse<{ name: string; email: string }>
        > = await ApiClient.put({
          url: `/api/users/password/update/${id}`,
          token: this.token,
          data: {
            old: this.state.form.password,
            new: this.state.form.newPassword,
          },
        });

        if (response.data.success) {
          localStorage.removeItem("user");
          localStorage.removeItem("accessToken");
          this.resetForm();
          message.open({
            key: "notification",
            type: "success",
            content: "Votre mot de pass a été modifier avec succès",
          });

          router.push('/')
        }
      } else {
        this.setModalLoading(false);
        message.open({
          key: "notification",
          type: "error",
          content: "Les mot ne pass ne correspondent pas",
        });
      }
    } catch (error) {
      this.resetForm();
      message.open({
        key: "notification",
        type: "error",
        content: "Une erreur est survenu lors de la modification de votre mot pass!",
      });
    }
  };

  deleteAccount = async (
    id: string,
    token: string,
    router: AppRouterInstance
  ) => {
    Modal.confirm({
      title: "Voulez-vous supprimer votre compte ?",
      content: "Votre compte sera supprimer definitivement !",
      okText: "Oui",
      okType: "danger",
      cancelText: "Non",
      async onOk() {
        try {
          const Response = await ApiClient.delete({
            token,
            url: `/api/users/delete/${id}`,
          });
          if (Response) {
            Modal.success({
              title: "Success!",
              content: "Compte supprimé avec success!",
              centered: true,
              okType: "default",
            });

            localStorage.removeItem("user");
            localStorage.removeItem("accessToken");

            router.push("/");
          }
        } catch (error) {
          Modal.error({
            title: "error",
            centered: true,
            content: "Une erreur est survenu lors de la suppression de votre compte!",
            okType: "default",
          });
        }
      },
      centered: true,
    });
  };
}
