import postApi from "../../axios/postApi";

//* interfaces *//
import { IPost } from "../../interfaces/post";

//! new post service
export const newPostService = async (formData: FormData): Promise<boolean> => {
  try {
    await postApi.post("/create", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });

    return true;
  } catch (error) {
    console.log(error);
    return false;
  }
};

//! get posts service
interface Props {
  pageParam?: number;
  url: string;
}

export const getPostsService = async ({ pageParam = 0, url }: Props) => {
  try {
    const params = new URLSearchParams();
    params.append("page", pageParam.toString());

    const { data } = await postApi.get(url, { params });

    return data.posts;
  } catch (error) {
    console.log(error);
    throw new Error("Error al obtener los posts");
  }
};

//! get unique post service
interface Return {
  ok: boolean;
  msg?: string;
  post?: IPost;
  postRef?: IPost;
}

export const getUniquePostService = async (url: string): Promise<Return> => {
  try {
    const { data } = await postApi.get(url);

    return data;
  } catch (error: any) {
    console.log(error);
    return error.response.data;
  }
};

//! remove post service
interface Return {
  ok: boolean;
  msg?: string;
}

export const removePostService = async (postId: string): Promise<Return> => {
  try {
    const { data } = await postApi.put("/delete", { postId });

    return data;
  } catch (error: any) {
    console.log(error);
    return error.response.data;
  }
};

//! like post service
export const likePostService = async (
  postId: string
): Promise<{ ok: boolean }> => {
  try {
    const { data } = await postApi.post(`/like?id=${postId}`);
    return data;
  } catch (error: any) {
    console.log(error);
    return error.response.data;
  }
};

//! saved post service
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
