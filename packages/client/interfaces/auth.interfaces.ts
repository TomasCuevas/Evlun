export interface IRegister {
  email: string;
  name: string;
  password: string;
  username: string;
}

export interface ILogin {
  email: string;
  password: string;
}

export type IAuthenticated = "authenticated" | "no-authenticated" | "checking";
