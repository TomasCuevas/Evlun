//* axios instance *//
import { postApi } from "@/axios";

//* interfaces *//
import { IPost } from "@/interfaces/post.interfaces";

//! new post service
export const newPostService = async (formData: FormData): Promise<boolean> => {
  try {
    await postApi.post(`/create`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });

    return true;
  } catch (error) {
    console.error(error);
    return false;
  }
};

//! get posts service
interface GetPostsServiceProps {
  pageParam?: number;
  url: string;
}

export const getPostsService = async ({
  pageParam = 0,
  url,
}: GetPostsServiceProps): Promise<{
  ok: boolean;
  posts?: IPost[];
  msg?: string;
}> => {
  try {
    const params = new URLSearchParams();
    params.append("page", pageParam.toString());

    const { data } = await postApi.get(`${url}`, { params });

    return {
      ok: true,
      posts: data.posts,
    };
  } catch (error: any) {
    console.error(error);
    return {
      ok: false,
      msg: error.response.data.msg,
    };
  }
};

//! get unique post service
export const getUniquePostService = async (
  postId: string
): Promise<{
  ok: boolean;
  msg?: string;
  post?: IPost;
  postRef?: IPost;
}> => {
  try {
    const { data } = await postApi.get(`/id/${postId}`);

    return {
      ok: true,
      post: data.post,
      postRef: data.postRef,
    };
  } catch (error: any) {
    console.error(error);
    return {
      ok: false,
      msg: error.response.data.msg,
    };
  }
};

//! remove post service
export const removePostService = async (
  postId: string
): Promise<{ ok: boolean; msg?: string }> => {
  try {
    await postApi.put(`/delete/${postId}`);
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

//! like post service
export const likePostService = async (
  postId: string
): Promise<{ ok: boolean; msg?: string }> => {
  try {
    await postApi.put(`/like/${postId}`);
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

//! saved post service
export const savedPostsService = async (
  method: "put" | "get",
  postId?: string
): Promise<{
  ok: boolean;
  msg?: string;
  savedPostsList?: string[];
}> => {
  if (method === "get") {
    try {
      const { data } = await postApi.get(`/savedList`);

      return {
        ok: true,
        savedPostsList: data.savedPostsList,
      };
    } catch (error: any) {
      console.error(error);
      return {
        ok: false,
        msg: error.response.data.msg,
      };
    }
  }

  if (method === "put") {
    try {
      await postApi.put(`/save/${postId}`);

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
  }

  return {
    ok: false,
  };
};
