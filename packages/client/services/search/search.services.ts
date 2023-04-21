import userApi from "../../axios/userApi";

//* interface *//
import { IUser } from "../../interfaces/user";

//! search service
interface Return {
  msg?: string;
  ok: boolean;
  users?: IUser[];
}

export const searchService = async (search: string): Promise<Return> => {
  try {
    const params = new URLSearchParams();
    params.append("search", search);

    const { data } = await userApi.get(`/search`, {
      params,
    });

    return data;
  } catch (error: any) {
    console.log(error);
    return { ...error.response.data, ok: false };
  }
};
