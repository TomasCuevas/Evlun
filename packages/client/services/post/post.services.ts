//* axios instance *//
import { postApi } from "@/axios";

//* interfaces *//
import { ICreatePost, IPost } from "@/interfaces";

//! new post service
export const newPostService = async (postData: ICreatePost): Promise<IPost> => {
  try {
    const { data } = await postApi.post(`/create`, postData);
    return data.post;
  } catch (error: any) {
    throw error.response.data;
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
}: GetPostsServiceProps): Promise<IPost[]> => {
  try {
    const params = new URLSearchParams();
    params.append("page", pageParam.toString());

    const { data } = await postApi.get(`${url}`, { params });
    return data.posts;
  } catch (error: any) {
    throw error.response.data;
  }
};

//! get unique post service
export const getUniquePostService = async (
  postId: string
): Promise<{
  post?: IPost;
  postRef?: IPost;
}> => {
  try {
    const { data } = await postApi.get(`/id/${postId}`);
    return {
      post: data.post,
      postRef: data.postRef,
    };
  } catch (error: any) {
    throw error.response.data;
  }
};

//! remove post service
export const removePostService = async (postId: string): Promise<void> => {
  try {
    await postApi.put(`/delete/${postId}`);
    return;
  } catch (error: any) {
    throw error.response.data;
  }
};

//! like or dislike post service
export const likeOrDislikePostService = async (
  postId: string
): Promise<void> => {
  try {
    await postApi.put(`/like/${postId}`);
    return;
  } catch (error: any) {
    throw error.response.data;
  }
};

//! get saved posts service
export const getSavedPostsService = async (): Promise<string[]> => {
  try {
    const { data } = await postApi.get(`/saved/list`);
    return data.savedPostsList;
  } catch (error: any) {
    throw error.response.data;
  }
};

//! update saved post service
export const updateSavedPostService = async (
  postId?: string
): Promise<void> => {
  try {
    await postApi.put(`/save/${postId}`);
    return;
  } catch (error: any) {
    throw error.response.data;
  }
};
