import userApi from "../../axios/userApi";

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
    return error.response.data;
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
      const { data } = await userApi.post("/follow", { userId });

      return data;
    } catch (error: any) {
      console.log(error);
      return error.response.data;
    }
  }

  if (status === "unfollow") {
    try {
      const { data } = await userApi.post("/unfollow", { userId });

      return data;
    } catch (error: any) {
      console.log(error);
      return error.response.data;
    }
  }

  return {
    ok: false,
  };
};
