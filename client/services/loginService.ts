import authApi from "../axios/authApi";

//* interface *//
import { ILogin } from "../interfaces/login";

export const loginService = async (loginData: ILogin) => {
  try {
    const { data } = await authApi.post("/login", loginData);

    return data;
  } catch (error: any) {
    console.log(error);
    return error.response.data;
  }
};
