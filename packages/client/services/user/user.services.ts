//* axios instance *//
import userApi from "@/axios/userApi";

//* interfaces *//
import { IUser } from "@/interfaces";

//! get user service
export const getUserService = async (
  username: string
): Promise<{
  ok: boolean;
  msg?: string;
  user?: IUser;
}> => {
  try {
    const { data } = await userApi.get(`/username/${username}`);

    return {
      ok: true,
      user: data.user,
    };
  } catch (error: any) {
    console.error(error);
    return {
      ok: false,
      msg: error.response.data.msg,
    };
  }
};

//! follow user service
export const followUserService = async (
  userId: string
): Promise<{ ok: boolean; msg?: string }> => {
  try {
    await userApi.put(`/follow/${userId}`);

    return {
      ok: true,
    };
  } catch (error: any) {
    console.error(error);
    return {
      ok: false,
      msg: error.response.data.msg,
    };
  }
};

//! unfollow user service
export const unfollowUserService = async (
  userId: string
): Promise<{ ok: boolean; msg?: string }> => {
  try {
    await userApi.put(`/unfollow/${userId}`);

    return {
      ok: true,
    };
  } catch (error: any) {
    console.error(error);
    return {
      ok: false,
      msg: error.response.data.msg,
    };
  }
};
