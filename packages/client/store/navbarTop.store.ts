import { create } from "zustand";

//* interfaces *//
import { ILocation, INavbarData } from "@/interfaces";

interface useNavbarTopState {
  location: ILocation;
  navbarData: INavbarData;
  onSetLocation(location: ILocation): void;
  onSetNavbarData(navbarData: INavbarData): void;
}

export const useNavbarTopStore = create<useNavbarTopState>((set, get) => ({
  location: "none",
  navbarData: {},
  onSetLocation(location: ILocation) {
    set(() => ({ location }));
  },
  onSetNavbarData(navbarData: INavbarData) {
    const { navbarData: previousData } = get();

    set(() => ({ navbarData: { ...previousData, ...navbarData } }));
  },
}));
