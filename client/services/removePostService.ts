import postApi from "../axios/postApi";

interface Return {
  ok: boolean;
  msg?: string;
}

export const removePostService = async (postId: string): Promise<Return> => {
  try {
    const { data } = await postApi.put("/delete", { postId });

    return data;
  } catch (error: any) {
    console.log(error);
    return error.response.data;
  }
};
