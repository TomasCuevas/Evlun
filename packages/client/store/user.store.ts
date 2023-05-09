import { create } from "zustand";

//* service *//
import { getUserService } from "@/services";

//* interfaces *//
import { IUser } from "@/interfaces";

interface useUserState {
  userUpdated?: IUser;
  getUser(username: string): void;
}

export const useUserStore = create<useUserState>((set) => ({
  userUpdated: undefined,
  async getUser(username: string) {
    const result = await getUserService(username);
    if (result.ok) {
      set(() => ({ userUpdated: result.user }));
    }
  },
}));
