import postApi from "../axios/postApi";

//* interface *//
interface Return {
  msg?: string;
  ok: boolean;
  savedPostsList?: string[];
}

export const savedPostsService = async (
  method: "post" | "get",
  postId?: string
): Promise<Return> => {
  if (method === "get") {
    try {
      const { data } = await postApi.get("/savedList");

      return data;
    } catch (error: any) {
      console.log(error);
      return error.response.data;
    }
  } else {
  }

  if (method === "post") {
    try {
      const { data } = await postApi.post("/save", { postId });

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
