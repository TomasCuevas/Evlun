//* axios instance *//
import { userApi } from "@/axios";

//* interface *//
import { IUser } from "@/interfaces";

//! search service
export const searchService = async (search: string): Promise<IUser[]> => {
  try {
    const params = new URLSearchParams();
    params.append("search", search);

    const { data } = await userApi.get(`/search`, {
      params,
    });

    return data.users;
  } catch (error: any) {
    throw error.response.data;
  }
};
