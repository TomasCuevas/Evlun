import { create } from "zustand";

//* query client *//
import { queryClient } from "@/pages/_app";

//* services *//
import {
  getSavedPostsService,
  likePostService,
  removePostService,
  updateSavedPostService,
} from "@/services";

//* store *//
import { useAuthStore } from "./auth.store";

//* interfaces *//
import { IPost } from "@/interfaces";

interface usePostsState {
  savedPostsList: string[];
  postModal?: IPost;
  onSetPostModal(post: IPost): void;
  onRemovePostModal(): void;
  onGetSavedPostsList(): Promise<void>;
  onLikePost(postId: string): Promise<void>;
  onRemovePost(postId: string): Promise<void>;
  onUpdateSavedPost(postId: string): Promise<void>;
}

export const usePostsStore = create<usePostsState>((set, get) => ({
  savedPostsList: [],
  postModal: undefined,
  async onSetPostModal(post: IPost) {
    document.body.classList.add("body__fix");
    set(() => ({ postModal: post }));
  },
  onRemovePostModal() {
    document.body.classList.remove("body__fix");
    set(() => ({ postModal: undefined }));
  },
  async onGetSavedPostsList() {
    const { isAuthenticated } = useAuthStore.getState();

    if (isAuthenticated === "authenticated") {
      const result = await getSavedPostsService();
      if (result.ok) set(() => ({ savedPostsList: result.savedPostsList }));
    }
  },
  async onLikePost(postId: string) {
    const result = await likePostService(postId);
    if (result.ok) {
      queryClient.refetchQueries(["/all"]);
    }
  },
  async onRemovePost(postId: string) {
    const result = await removePostService(postId);
    if (result.ok) queryClient.refetchQueries(["/all"]);
  },
  async onUpdateSavedPost(postId) {
    const { onGetSavedPostsList } = get();

    const result = await updateSavedPostService(postId);
    if (result.ok) {
      queryClient.refetchQueries(["/saved"]);
      onGetSavedPostsList();
    }
  },
}));
