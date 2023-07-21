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
  _id: string;
  firstname: string;
  lastname: string;
  middlename: string;
  vacation: "AV" | "AP";
}

interface IVacation{
  vacation : "AV" | "AP"
}


interface ICard {
  title: string;
  value: number;
  icon: React.ReactNode;
  status: boolean;
  suffix: string;
}

interface IStudentAttendance {
  status: 'ABSENT' | "PRESENT";
  student: IStudent ;
}
interface IAttendance {
  date: string;
  students: { status: 'ABSENT' | "PRESENT"; student: IStudent }[];
  vacation : "AV" | "AP"
}

