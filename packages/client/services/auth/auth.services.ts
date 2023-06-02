//* axios instance *//
import authApi from "@/axios/authApi";

//* interface *//
import { IUser, ILogin, IRegister } from "@/interfaces";

//! register service
export const registerService = async (
  registerData: IRegister
): Promise<{ user: IUser; token: string }> => {
  try {
    const { data } = await authApi.post("/create", registerData);

    return {
      user: data.user,
      token: data.token,
    };
  } catch (error: any) {
    throw error.response.data;
  }
};

//! login service
export const loginService = async (
  loginData: ILogin
): Promise<{ user: IUser; token: string }> => {
  try {
    const { data } = await authApi.post(`/login`, loginData);

    return {
      user: data.user,
      token: data.token,
    };
  } catch (error: any) {
    throw error.response.data;
  }
};

//! check service
export const checkService = async (): Promise<{
  user: IUser;
  token: string;
}> => {
  try {
    const { data } = await authApi.get(`/check`);

    return {
      user: data.user,
      token: data.token,
    };
  } catch (error: any) {
    throw error.response.data;
  }
};

//! reactive service
export const reactivateService = async (loginData: ILogin): Promise<void> => {
  try {
    await authApi.put(`/reactivate`, loginData);
    return;
  } catch (error: any) {
    throw error.response.data;
  }
};

//! deactivate service
export const deactivateService = async (formValues: any): Promise<void> => {
  try {
    await authApi.put(`/deactivate`, formValues);

    return;
  } catch (error: any) {
    throw error.response.data;
  }
};
