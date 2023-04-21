import userApi from "../../axios/userApi";
import axios from "axios";

//* interfaces *//
import { IUser } from "../../interfaces/user";

//! get user service
interface Return {
  ok: boolean;
  msg?: string;
  user?: IUser;
}

export const getUserService = async (username: string): Promise<Return> => {
  try {
    const { data } = await userApi.get(`/username/${username}`);

    return data;
  } catch (error: any) {
    console.log(error);
    return { ...error.response.data, ok: false };
  }
};

//! follow or unfollow service
interface Return {
  ok: boolean;
  msg?: string;
}

export const followOrUnfollowService = async (
  status: "follow" | "unfollow",
  userId: string
): Promise<Return> => {
  if (status === "follow") {
    try {
      const { data } = await userApi.put(`/follow/${userId}`);

      return data;
    } catch (error: any) {
      console.log(error);
      return { ...error.response.data, ok: false };
    }
  }

  if (status === "unfollow") {
    try {
      const { data } = await userApi.put(`/unfollow/${userId}`);

      return data;
    } catch (error: any) {
      console.log(error);
      return { ...error.response.data, ok: false };
    }
  }

  return {
    ok: false,
  };
};