import userApi from "../axios/userApi";

//* interfaces *//
import { IUser } from "../interfaces/user";

interface Return {
  ok: boolean;
  msg?: string;
  user?: IUser;
}

export const getUserService = async (username: string): Promise<Return> => {
  try {
    const { data } = await userApi.get(`/username/${username}`);

    return data;
  } catch (error: any) {
    console.log(error);
    return error.response.data;
  }
};
