//* axios instance *//
import authApi from "@/axios/authApi";

//* interface *//
import { IUser, ILogin, IRegister } from "@/interfaces";

//! register service
export const registerService = async (
  registerData: IRegister
): Promise<{ ok: boolean; user?: IUser; token?: string; msg?: string }> => {
  try {
    const { data } = await authApi.post("/create", registerData);

    return {
      ok: true,
      user: data.user,
      token: data.token,
    };
  } catch (error: any) {
    console.error(error);
    return {
      ok: false,
      msg: error.response.data.msg,
    };
  }
};

//! login service
export const loginService = async (
  loginData: ILogin
): Promise<{
  ok: boolean;
  user?: IUser;
  token?: string;
  msg?: string;
  status?: number;
}> => {
  try {
    const { data } = await authApi.post(`/login`, loginData);

    return {
      ok: true,
      user: data.user,
      token: data.token,
    };
  } catch (error: any) {
    console.error(error);
    return {
      ok: false,
      msg: error.response.data.msg,
      status: error.response.data.status,
    };
  }
};

//! check service
export const checkService = async (): Promise<{
  ok: boolean;
  user?: IUser;
  token?: string;
  msg?: string;
}> => {
  try {
    const { data } = await authApi.get(`/check`);

    return {
      ok: true,
      user: data.user,
      token: data.token,
    };
  } catch (error: any) {
    console.error(error);
    return {
      ok: false,
      msg: error.response.data.msg,
    };
  }
};

//! reactive service
export const reactivateService = async (
  formData: FormData
): Promise<{ ok: boolean; msg?: string }> => {
  try {
    await authApi.put(`/reactivate`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });

    return {
      ok: true,
    };
  } catch (error: any) {
    console.error(error);
    return {
      ok: false,
      msg: error.response.data.msg,
    };
  }
};

//! deactivate service
export const deactivateService = async (
  formData: FormData
): Promise<{ ok: boolean; msg?: string }> => {
  try {
    await authApi.put(`/deactivate`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });

    return {
      ok: true,
    };
  } catch (error: any) {
    console.error(error);
    return {
      ok: false,
      msg: error.response.data.msg,
    };
  }
};
