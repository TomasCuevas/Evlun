import { create } from "zustand";

//* interfaces *//
import { AddedBy } from "@/interfaces";

interface RightSidebarItems {
  explorer: boolean;
  profile: boolean;
  relevant: boolean;
}

interface useRightSidebarState {
  relevantPersons: AddedBy[];
  sidebarItems: RightSidebarItems;
  onChangeSidebarItems(item: RightSidebarItems): void;
  setRelevantPersons(persons: AddedBy[]): void;
}

export const useRightSidebarStore = create<useRightSidebarState>((set) => ({
  relevantPersons: [],
  sidebarItems: {
    explorer: false,
    profile: false,
    relevant: false,
  },
  onChangeSidebarItems(item: RightSidebarItems) {
    set(() => ({
      sidebarItems: item,
    }));
  },
  setRelevantPersons(persons: AddedBy[]) {
    set(() => ({
      relevantPersons: persons,
    }));
  },
}));
