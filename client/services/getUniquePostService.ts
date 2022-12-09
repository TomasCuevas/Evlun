import postApi from "../axios/postApi";

//* interfaces *//
import { IPost } from "../interfaces/post";

interface Return {
  ok: boolean;
  msg?: string;
  post?: IPost;
  postRef?: IPost;
}

export const getUniquePostService = async (url: string): Promise<Return> => {
  try {
    const { data } = await postApi.get(url);

    return data;
  } catch (error: any) {
    console.log(error);
    return error.response.data;
  }
};
