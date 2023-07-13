export interface IUser {
  accessToken: string;
  user: {
    name: string;
    email: string;
    password: string;
    id: string;
  }
}

interface IResponse<TData> {
  message: string;
  data: TData;
  error: unknown;
  success: boolean;
}

export interface IStudent {
  id: string;
  firstname: string;
  lastname: string;
  middlename: string;
  vacation: "AV" | "AP";
}

interface ICard {
  title: string;
  value: number;
  icon: React.ReactNode;
  status: boolean;
  suffix: string;
}