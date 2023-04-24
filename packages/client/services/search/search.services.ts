//* axios instance *//
import { userApi } from "@/axios";

//* interface *//
import { IUser } from "@/interfaces";

//! search service
export const searchService = async (
  search: string
): Promise<{
  ok: boolean;
  users?: IUser[];
  msg?: string;
}> => {
  try {
    const params = new URLSearchParams();
    params.append("search", search);

    const { data } = await userApi.get(`/search`, {
      params,
    });

    return {
      ok: true,
      users: data.users,
    };
  } catch (error: any) {
    console.log(error);
    return {
      ok: false,
      msg: error.response.data.msg,
    };
  }
};
