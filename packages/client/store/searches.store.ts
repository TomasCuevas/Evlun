import { create } from "zustand";

//* services *//
import { searchService } from "@/services";

//* interfaces *//
import { IUser } from "@/interfaces";

interface useSearchesState {
  usersSearched: IUser[];
  onSearchUsers(search: string): Promise<void>;
}

export const useSearchesStore = create<useSearchesState>((set) => ({
  usersSearched: [],
  async onSearchUsers(search: string) {
    if (search.length < 1) {
      set(() => ({ usersSearched: [] }));
      return;
    }

    const result = await searchService(search);
    if (result.ok) {
      set(() => ({ usersSearched: result.users }));
    }
  },
}));
