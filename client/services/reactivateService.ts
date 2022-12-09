import authApi from "../axios/authApi";

interface Return {
  ok: boolean;
  msg?: string;
}

export const reactivateService = async (
  formData: FormData
): Promise<Return> => {
  try {
    const { data } = await authApi.put("/reactivate", formData, {
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
