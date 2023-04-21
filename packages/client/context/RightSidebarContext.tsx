import { createContext, useState, useEffect } from "react";
import { useRouter } from "next/router";

//* interfaces *//
import { Addedby } from "../interfaces/post";

interface Items {
  explorer: boolean;
  profile: boolean;
  relevant: boolean;
}

//* CONTEXT *//
//* CONTEXT *//
interface RightSidebarContextProps {
  relevantPersons: Addedby[] | undefined;
  sidebarItems: Items;
  onChangeSidebarItems(items: Items): void;
  setRelevantPersons(persons: Addedby[]): void;
}

export const RightSidebarContext = createContext(
  {} as RightSidebarContextProps
);

//* PROVIDER *//
//* PROVIDER *//
const items: Items = {
  explorer: false,
  profile: false,
  relevant: false,
};

interface RightSidebarProviderProps {
  children: React.ReactNode;
}

export const RightSidebarProvider: React.FC<RightSidebarProviderProps> = ({
  children,
}) => {
  const [sidebarItems, setSidebarItems] = useState<Items>(items);
  const [relevantPersons, setRelevantPerson] = useState<Addedby[]>();

  const router = useRouter();

  useEffect(() => {
    if (router.pathname.includes("settings")) setSidebarItems(items);
  }, [router.pathname]);

  //! change sidebar items
  const onChangeSidebarItems = (items: Items) => setSidebarItems(items);

  //! set relevantPersons
  const setRelevantPersons = (persons: Addedby[]) => setRelevantPerson(persons);

  return (
    <RightSidebarContext.Provider
      value={{
        // getters
        sidebarItems,
        relevantPersons,

        // methods
        onChangeSidebarItems,
        setRelevantPersons,
      }}
    >
      {children}
    </RightSidebarContext.Provider>
  );
};
