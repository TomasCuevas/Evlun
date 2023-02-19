import { createContext, Dispatch, SetStateAction, useState } from "react";

//* CONTEXT *//
//* CONTEXT *//
interface RightSidebarContextProps {
  sidebarItems: Items;
  onChangeSidebarItems(items: Items): void;
}

export const RightSidebarContext = createContext(
  {} as RightSidebarContextProps
);

//* PROVIDER *//
//* PROVIDER *//
interface Items {
  explorer: boolean;
  profile: boolean;
  relevant: boolean;
}

interface RightSidebarProviderProps {
  children: React.ReactNode;
}

export const RightSidebarProvider: React.FC<RightSidebarProviderProps> = ({
  children,
}) => {
  const [sidebarItems, setSidebarItems] = useState<Items>({
    explorer: false,
    profile: false,
    relevant: false,
  });

  const onChangeSidebarItems = (items: Items) => setSidebarItems(items);

  return (
    <RightSidebarContext.Provider
      value={{
        // getters
        sidebarItems,

        // methods
        onChangeSidebarItems,
      }}
    >
      {children}
    </RightSidebarContext.Provider>
  );
};
