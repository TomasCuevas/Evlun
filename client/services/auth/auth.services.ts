import axios from "axios";
import Cookies from "js-cookie";

//* interface *//
import { ICheck } from "../../interfaces/check";
import { ILogin } from "../../interfaces/login";
import { IRegister } from "../../interfaces/register";

axios.defaults.headers.common["evluntoken"] = Cookies.get("evluntoken") || "";

//! login service
export const loginService = async (loginData: ILogin) => {
  try {
    const { data } = await axios.post(
      `${process.env.NEXT_PUBLIC_API_URI}/auth/login`,
      loginData,
      { withCredentials: true }
    );

    return data;
  } catch (error: any) {
    console.log(error);
    return { ...error.response.data, ok: false };
  }
};

//! register service
export const registerService = async (registerData: IRegister) => {
  try {
    const { data } = await axios.post(
      `${process.env.NEXT_PUBLIC_API_URI}/auth/create`,
      registerData,
      { withCredentials: true }
    );

    return data;
  } catch (error: any) {
    console.log(error);
    return { ...error.response.data, ok: false };
  }
};

//! check service
export const checkService = async (): Promise<ICheck> => {
  try {
    const { data } = await axios.get<ICheck>(
      `${process.env.NEXT_PUBLIC_API_URI}/auth/check`,
      {
        withCredentials: true,
      }
    );

    return data;
  } catch (error: any) {
    console.log(error);
    return { ...error.response.data, ok: false };
  }
};

//! reactivate service
interface ReactivateServiceReturn {
  ok: boolean;
  msg?: string;
}

export const reactivateService = async (
  formData: FormData
): Promise<ReactivateServiceReturn> => {
  try {
    const { data } = await axios.put(
      `${process.env.NEXT_PUBLIC_API_URI}/auth/reactivate`,
      formData,
      {
        withCredentials: true,
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );

    return data;
  } catch (error: any) {
    console.log(error);
    return { ...error.response.data, ok: false };
  }
};

//! deactivate service
interface DeactivateServiceReturn {
  ok: boolean;
  msg?: string;
}

export const deactivateService = async (
  formData: FormData
): Promise<DeactivateServiceReturn> => {
  try {
    const { data } = await axios.put(
      `${process.env.NEXT_PUBLIC_API_URI}/auth/deactivate`,
      formData,
      {
        withCredentials: true,
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );

    return data;
  } catch (error: any) {
    console.log(error);
    return { ...error.response.data, ok: false };
  }
};
