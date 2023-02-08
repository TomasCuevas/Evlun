import { createContext, useState } from "react";

//* interfaces *//
import { IPost } from "../interfaces/post";

//* CONTEXT *//
//* CONTEXT *//
interface UIContextProps {
  isExploreModalOpen: boolean;
  isSidebarModalOpen: boolean;
  isSidebarOpen: boolean;
  postModal: IPost | undefined;

  onSetPost(post: IPost | undefined): void;
  onSwitchExploreModal(status?: boolean): void;
  onSwitchSidebar(): void;
  onSwitchSidebarModal(): void;
}

export const UIContext = createContext({} as UIContextProps);

//* PROVIDER *//
//* PROVIDER *//

interface UIProviderProps {
  children: React.ReactNode;
}

export const UIProvider: React.FC<UIProviderProps> = ({ children }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState<boolean>(false);
  const [postModal, setPostModal] = useState<IPost>();
  const [isExploreModalOpen, setIsExploreModalOpen] = useState<boolean>(false);
  const [isSidebarModalOpen, setIsSidebarModalOpen] = useState(false);

  //! open or close mobile sidebar
  const onSwitchSidebar = () => setIsSidebarOpen((prev) => !prev);

  //! open or close explore modal
  const onSwitchExploreModal = (status?: boolean) => {
    setIsExploreModalOpen(status!);
  };

  //! open or close logout sidebar modal
  const onSwitchSidebarModal = () => setIsSidebarModalOpen((prev) => !prev);

  //! set a post at more options
  const onSetPost = (post: IPost | undefined) => {
    if (post) {
      document.body.classList.add("body__fix");
    } else {
      document.body.classList.remove("body__fix");
    }

    setPostModal(post);
  };

  return (
    <UIContext.Provider
      value={{
        //* properties
        isExploreModalOpen,
        isSidebarModalOpen,
        isSidebarOpen,
        postModal,

        //* methods
        onSetPost,
        onSwitchExploreModal,
        onSwitchSidebar,
        onSwitchSidebarModal,
      }}
    >
      {children}
    </UIContext.Provider>
  );
};
