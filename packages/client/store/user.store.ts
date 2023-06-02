import { create } from "zustand";

//* service *//
import { getUserService } from "@/services";

//* interfaces *//
import { IUser } from "@/interfaces";

interface useUserState {
  userUpdated?: IUser;
  clearUser(): void;
  getUser(username: string): void;
}

export const useUserStore = create<useUserState>((set) => ({
  userUpdated: undefined,

  //! clear user
  clearUser() {
    set(() => ({ userUpdated: undefined }));
  },

  //! get user
  async getUser(username: string) {
    try {
      const user = await getUserService(username);
      set(() => ({ userUpdated: user }));
    } catch (error) {}
  },
}));
