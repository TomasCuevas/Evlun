import { IUser } from "./user";

export interface ICheck {
  ok: boolean;
  token: string;
  user: IUser;
}
