import axios from "axios";

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

    const { data } = await axios.get(
      `${process.env.NEXT_PUBLIC_API_URI}/user/search`,
      {
        params,
        withCredentials: true,
      }
    );

    return data;
  } catch (error: any) {
    console.log(error);
    return { ...error.response.data, ok: false };
  }
};
