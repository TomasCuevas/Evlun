import { create } from "zustand";

//* services *//
import { searchService } from "@/services";

//* interfaces *//
import { IUser } from "@/interfaces";

interface useSearchesState {
  usersSearched: IUser[];
  resetUsers(): void;
  onSearchUsers(search: string): Promise<void>;
}

export const useSearchesStore = create<useSearchesState>((set) => ({
  usersSearched: [],

  //! reset users
  resetUsers() {
    set(() => ({ usersSearched: [] }));
  },

  //! search users
  async onSearchUsers(search: string) {
    if (search.length < 1) {
      set(() => ({ usersSearched: [] }));
      return;
    }

    try {
      const users = await searchService(search);
      set(() => ({ usersSearched: users }));
    } catch (error) {
      throw error;
    }
  },
}));
