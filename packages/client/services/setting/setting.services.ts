//* axios instance *//
import { settingsApi } from "@/axios";

//! setting [services]
export const settingServices = async (
  url: string,
  formValues: any
): Promise<void> => {
  try {
    const { data } = await settingsApi.put(`/${url}`, formValues, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });

    return data;
  } catch (error: any) {
    throw error.response.data;
  }
};
