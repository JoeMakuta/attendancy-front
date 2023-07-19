import { IResponse } from "@/types/global";
import { message } from "antd";
import { AxiosResponse } from "axios";
import { ChangeEvent, Dispatch, SetStateAction } from "react";
import { ApiClient } from "./apiClient";

interface IAdminForm {
  form: {
    name: string;
    email: string;
    password: string;
  };
  action: "Ajouter" | "Enregister";
  loading: boolean;
  showModal: boolean;
  adminId: string;
}


export class AdminModalPortal {

  state: IAdminForm
  dispatcher: Dispatch<SetStateAction<IAdminForm>>;
  token: string;

  /* ========== Init the modal form portal ======== */

  constructor(state : IAdminForm , dispatcher: Dispatch<SetStateAction<IAdminForm>>, token : string) {
    this.state = state
    this.dispatcher = dispatcher;
    this.token = token
  }

  /* --------- Form handler on modal ----------- */

  handleForm = (e: ChangeEvent<HTMLInputElement>, target: string) => {
    this.dispatcher({
      ...this.state,
      form: {
        ...this.state.form,
        password: this.state.form.name,
        [target]: e.target.value,
      },
    });
  };

  /* --------- Show or hide the modal ----------- */

  showModal = (
    value: boolean
  ) => {
    this.dispatcher({ ...this.state, showModal: value });
  };

  /* --------- Set the loading on modal ----------- */

  setModalLoading = (
    value: boolean
  ) => {
    this.dispatcher({
      ...this.state,
      loading: value,
    });
  };

  /* --------- Create an admin ----------- */

  createAdmin = async (
  ) => {
    try {
      this.setModalLoading(true);

      const response: AxiosResponse<
        IResponse<{ name: string; email: string }>
      > = await ApiClient.post({
        url: "api/auth/register",
        token : this.token,
        data: this.state.form,
      });

      if (response.data.success) {
        this.dispatcher({
          ...this.state,
          form: { name: "", email: "", password: "" },
          showModal: false,
          loading: false,
        });
        message.open({
          key: "notification",
          type: "success",
          content: "Admin ajouté avec succès",
        });
      }
    } catch (error) {
      this.dispatcher({
        ...this.state,
        form: { name: "", email: "", password: "" },
        showModal: false,
        loading: false,
      });
      message.open({
        key: "notification",
        type: "error",
        content: "Une erreur est survenu lors de la suppression!",
      });
    }
  };

  /* --------- Update an admin ----------- */

  updateAdmin = async (id: string) => {
    try {
      this.setModalLoading(true);

      const response: AxiosResponse<
        IResponse<{ name: string; email: string }>
      > = await ApiClient.post({
        url: `/api/users/update/${id}`,
        token : this.token,
        data: this.state.form,
      });

      if (response.data.success) {
        this.dispatcher({
          ...this.state,
          form: { name: "", email: "", password: "" },
          loading: false,
          showModal: false,
        });
        message.open({
          key: "notification",
          type: "success",
          content: "Enregistré avec succès",
        });
      }
    } catch (error) {
      this.dispatcher({
        ...this.state,
        form: { name: "", email: "", password: "" },
        loading: false,
      });
      console.log(error);
      message.open({
        key: "notification",
        type: "error",
        content: "Une erreur est survenu lors de la suppression!",
      });
    }
  };
}
