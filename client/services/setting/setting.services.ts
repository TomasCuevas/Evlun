import axios from "axios";

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
    const { data } = await axios.put(
      `${process.env.NEXT_PUBLIC_API_URI}/settings/${url}`,
      formValues,
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
