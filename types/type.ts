export interface IUser{
   name : string,
   email : string,
   password : string
}

export interface IUserResponse{
   data : unknown,
   error : unknown,
   message : string,
   success : boolean
}

export interface IStudent {
   id: string;
   firstname: string;
   lastname: string;
   middlename: string;
   vacation: 'AV' | "AP";
 }

export interface IUser {
   id: string;
   name: string;
   email: string;
   password: string;
 }