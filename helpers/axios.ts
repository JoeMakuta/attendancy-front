import axios, { AxiosResponse } from "axios";

export class AxiosHelpers {
  static baseUrl = process.env.NEXT_PUBLIC_BASE_URL;

  static get = async ({
    url = "",
    token = "",
  } = {}): Promise<AxiosResponse> => {
    return await axios({
      baseURL: this.baseUrl,
      url,
      method: "GET",
      headers: {
        Authorization: "Bearer " + token,
      },
    });
  };

  static post = async ({
    url = "",
    data = {},
    token = "",
  } = {}): Promise<AxiosResponse> => {
    return await axios({
      baseURL: this.baseUrl,
      url,
      data,
      method: "POST",
      headers: {
        Authorization: "Bearer " + token,
      },
    });
  };
}