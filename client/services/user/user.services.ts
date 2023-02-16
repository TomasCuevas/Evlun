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
    const { data } = await axios.get(
      `${process.env.NEXT_PUBLIC_API_URI}/user/username/${username}`,
      { withCredentials: true }
    );

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
      const { data } = await axios.put(
        `${process.env.NEXT_PUBLIC_API_URI}/user/follow/${userId}`,
        {},
        { withCredentials: true }
      );

      return data;
    } catch (error: any) {
      console.log(error);
      return { ...error.response.data, ok: false };
    }
  }

  if (status === "unfollow") {
    try {
      const { data } = await axios.put(
        `${process.env.NEXT_PUBLIC_API_URI}/user/unfollow/${userId}`,
        {},
        { withCredentials: true }
      );

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
