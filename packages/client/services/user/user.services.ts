//* axios instance *//
import { userApi } from "@/axios";

//* interfaces *//
import { IUser } from "@/interfaces";

//! get user service
export const getUserService = async (username: string): Promise<IUser> => {
  try {
    const { data } = await userApi.get(`/username/${username}`);
    return data.user;
  } catch (error: any) {
    throw error.response.data;
  }
};

//! follow user service
export const followUserService = async (userId: string): Promise<void> => {
  try {
    await userApi.put(`/follow/${userId}`);
    return;
  } catch (error: any) {
    throw error.response.data;
  }
};

//! unfollow user service
export const unfollowUserService = async (userId: string): Promise<void> => {
  try {
    await userApi.put(`/unfollow/${userId}`);
  } catch (error: any) {
    throw error.response.data;
  }
};

//! get following
export const getFollowingService = async (pageParam = 0): Promise<IUser[]> => {
  try {
    const params = new URLSearchParams();
    params.append("page", pageParam.toString());

    const { data } = await userApi.get("/following", { params });
    return data.users;
  } catch (error: any) {
    throw error.response.data;
  }
};
