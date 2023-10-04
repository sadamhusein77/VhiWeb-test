export interface IAuthLogin {
    email: string;
    password: string;
}

export interface IUserRegister {
    username: string;
    email: string;
    password: string;
}

export interface IUserData {
    id: number;
    email: string;
    first_name:string;
    last_name: string;
    avatar: string;
}

export interface IDataBreadcrumbs {
    name: string;
    path: string;
    isActive: boolean;
  }