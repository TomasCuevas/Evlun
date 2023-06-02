import { create } from "zustand";

//* interfaces *//
import { ILocation, INavbarData } from "@/interfaces";

interface useNavbarTopState {
  location: ILocation;
  navbarData: INavbarData;
  resetStore(): void;
  onSetLocation(location: ILocation): void;
  onSetNavbarData(navbarData: INavbarData): void;
}

export const useNavbarTopStore = create<useNavbarTopState>((set) => ({
  location: "none",
  navbarData: {},

  //! reset store
  resetStore() {
    set(() => ({ location: "none", navbarData: {} }));
  },

  //! set location
  onSetLocation(location: ILocation) {
    set(() => ({ location: "none" }));
    set(() => ({ location }));
  },

  //! set navbar data
  async onSetNavbarData(navbarData: INavbarData) {
    set(() => ({ navbarData: {} }));
    set(() => ({ navbarData: { ...navbarData } }));
  },
}));
