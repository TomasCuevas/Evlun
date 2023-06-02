import { create } from "zustand";

//* interfaces *//
interface useUiState {
  isMobileSidebarOpen: boolean;
  isExploreModalOpen: boolean;
  onSwitchMobileSidebar(): void;
  onSwitchExploreModal(status?: boolean): void;
}

export const useUiStore = create<useUiState>((set, get) => ({
  isMobileSidebarOpen: false,
  isExploreModalOpen: false,

  //! switch mobile sidebar
  onSwitchMobileSidebar() {
    const { isMobileSidebarOpen } = get();

    if (isMobileSidebarOpen === true) {
      document.body.classList.remove("body__fix");
    } else {
      document.body.classList.add("body__fix");
    }

    set(() => ({ isMobileSidebarOpen: !isMobileSidebarOpen }));
  },

  //! switch explore modal
  onSwitchExploreModal(status?: boolean) {
    const { isExploreModalOpen } = get();
    set(() => ({ isExploreModalOpen: status || !isExploreModalOpen }));
  },
}));
