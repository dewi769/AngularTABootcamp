export interface IUser {
  // username: string;
  // password: string;
  token: string;
}

export interface IUserWrapper {
  data: IUser;
  success: boolean;
  errorCode:string;
  message: string;
  status: number;
  timestamp:string;
}
