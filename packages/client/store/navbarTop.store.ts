import { create } from "zustand";

//* interfaces *//
import { INavbarData } from "@/interfaces";

interface useNavbarTopState {
  navbarData: INavbarData;
  onSetNavbarData(navbarData: INavbarData): void;
}

export const useNavbarTopStore = create<useNavbarTopState>((set) => ({
  navbarData: {
    homeLocation: "all",
  },

  //! set navbar data
  async onSetNavbarData(navbarData: INavbarData) {
    set((prev) => ({
      navbarData: {
        ...navbarData,
        homeLocation: navbarData.homeLocation || prev.navbarData.homeLocation,
      },
    }));
  },
}));
