import settingsApi from "../../axios/settingsApi";

//! setting services
interface Return {
  ok: boolean;
  msg?: string;
}

export const settingServices = async (
  url: string,
  formValues: FormData
): Promise<Return> => {
  try {
    const { data } = await settingsApi.put(`${url}`, formValues, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });

    return data;
  } catch (error: any) {
    console.log(error);
    return error.response.data;
  }
};
