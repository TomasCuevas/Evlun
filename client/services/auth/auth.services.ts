import authApi from "../../axios/authApi";

//* interface *//
import { ICheck } from "../../interfaces/check";
import { ILogin } from "../../interfaces/login";
import { IRegister } from "../../interfaces/register";

//! login service
export const loginService = async (loginData: ILogin) => {
  try {
    const { data } = await authApi.post("/login", loginData);

    return data;
  } catch (error: any) {
    console.log(error);
    return { ...error.response.data, ok: false };
  }
};

//! register service
export const registerService = async (registerData: IRegister) => {
  try {
    const { data } = await authApi.post("/create", registerData);

    return data;
  } catch (error: any) {
    console.log(error);
    return { ...error.response.data, ok: false };
  }
};

//! check service
export const checkService = async (): Promise<ICheck> => {
  try {
    const { data } = await authApi.get<ICheck>("/check", {
      withCredentials: true,
    });

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
    const { data } = await authApi.put("/reactivate", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });

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
    const { data } = await authApi.put("/deactivate", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });

    return data;
  } catch (error: any) {
    console.log(error);
    return { ...error.response.data, ok: false };
  }
};
