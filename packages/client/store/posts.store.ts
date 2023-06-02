import { create } from "zustand";

//* query client *//
import { queryClient } from "@/pages/_app";

//* services *//
import {
  getSavedPostsService,
  likeOrDislikePostService,
  newPostService,
  removePostService,
  updateSavedPostService,
} from "@/services";

//* store *//
import { useAuthStore } from "./auth.store";

//* interfaces *//
import { ICreatePost, IPost } from "@/interfaces";

interface usePostsState {
  savedPostsList: string[];
  postModal?: IPost;
  onOpenModal(post: IPost): void;
  onCloseModal(): void;
  onCreatePost(postData: ICreatePost, postRef?: string): Promise<IPost>;
  onGetSavedPostsList(): Promise<void>;
  onLikeOrDislikePost(postId: string, postRef?: string): Promise<void>;
  onRemovePost(postId: string): Promise<void>;
  onUpdateSavedPost(postId: string): Promise<void>;
}

export const usePostsStore = create<usePostsState>((set, get) => ({
  savedPostsList: [],
  postModal: undefined,

  //! open modal
  async onOpenModal(post) {
    document.body.classList.add("body__fix");
    set(() => ({ postModal: post }));
  },

  //! close modal
  onCloseModal() {
    document.body.classList.remove("body__fix");
    set(() => ({ postModal: undefined }));
  },

  //! create post
  async onCreatePost(postData, postRef) {
    try {
      const result = await newPostService(postData);

      if (postRef) {
        queryClient.invalidateQueries([`/answers/${postRef}`]);
      } else {
        queryClient.invalidateQueries(["/all"]);
      }

      return result;
    } catch (error) {
      throw error;
    }
  },

  //! get saved posts list
  async onGetSavedPostsList() {
    const { isAuthenticated } = useAuthStore.getState();
    if (isAuthenticated !== "authenticated") return;

    try {
      const result = await getSavedPostsService();
      set(() => ({ savedPostsList: result }));
    } catch (error) {
      throw error;
    }
  },

  //! like or dislike post
  async onLikeOrDislikePost(postId, postRef) {
    try {
      await likeOrDislikePostService(postId);

      if (postRef) {
        queryClient.refetchQueries([`/answers/${postRef}`]);
      } else {
        queryClient.refetchQueries(["/all"]);
      }
    } catch (error) {
      throw error;
    }
  },

  //! remove post
  async onRemovePost(postId) {
    try {
      await removePostService(postId);
      queryClient.refetchQueries(["/all"]);
    } catch (error) {
      throw error;
    }
  },

  //! update saved post
  async onUpdateSavedPost(postId) {
    const { onGetSavedPostsList } = get();

    try {
      await updateSavedPostService(postId);
      queryClient.refetchQueries(["/saved"]);
      onGetSavedPostsList();
    } catch (error) {
      throw error;
    }
  },
}));
