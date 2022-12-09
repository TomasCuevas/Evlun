import authApi from "../axios/authApi";

interface Return {
  ok: boolean;
  msg?: string;
}

export const deactivateService = async (
  formData: FormData
): Promise<Return> => {
  try {
    const { data } = await authApi.put("/deactivate", formData, {
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
