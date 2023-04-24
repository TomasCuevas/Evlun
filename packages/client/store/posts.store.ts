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
interface usePostsState {
  savedPostsList: string[];
  onGetSavedPostsList(): Promise<void>;
  onLikePost(postId: string): Promise<void>;
  onRemovePost(postId: string): Promise<void>;
  onUpdateSavedPost(postId: string): Promise<void>;
}

export const usePostsStore = create<usePostsState>((set, get) => ({
  savedPostsList: [],
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
