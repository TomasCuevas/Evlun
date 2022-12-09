import authApi from "../axios/authApi";

//* interface *//
import { ICheck } from "../interfaces/check";

export const checkService = async (): Promise<ICheck> => {
  try {
    const { data } = await authApi.get<ICheck>("/check");

    return data;
  } catch (error: any) {
    console.log(error);
    return error.response.data;
  }
};
