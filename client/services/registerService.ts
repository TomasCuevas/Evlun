import authApi from "../axios/authApi";

//* interface *//
import { IRegister } from "../interfaces/register";

export const registerService = async (registerData: IRegister) => {
  try {
    const { data } = await authApi.post("/create", registerData);

    return data;
  } catch (error: any) {
    console.log(error);
    return error.response.data;
  }
};
