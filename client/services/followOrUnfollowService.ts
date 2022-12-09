import userApi from "../axios/userApi";

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
