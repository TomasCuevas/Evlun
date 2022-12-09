//* axios *//
import postApi from "../axios/postApi";

interface Return {
  ok: boolean;
}

export const likePostService = async (postId: string): Promise<Return> => {
  try {
    const { data } = await postApi.post(`/like?id=${postId}`);
    return data;
  } catch (error: any) {
    console.log(error);
    return error.response.data;
  }
};
