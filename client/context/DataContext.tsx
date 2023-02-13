import { createContext, useState, useEffect, useContext } from "react";
import { useQueryClient } from "@tanstack/react-query";

//* context *//
import { AuthContext } from "./AuthContext";

//* services *//
import {
  removePostService,
  savedPostsService,
  searchService,
} from "../services";

//* interfaces *//
import { IUser } from "../interfaces/user";

//* CONTEXT *//
//* CONTEXT *//
interface DataContextProps {
  savedPostsList: string[];
  usersSearch: IUser[];

  onGetSavedPostsList(): void;
  onRemovePost(postId: string): void;
  onRemoveSavedPost(postId: string): void;
  onSearchUsers(search: string): void;
  onSetSavedPost(postId: string): void;
}

export const DataContext = createContext({} as DataContextProps);

//* PROVIDER *//
//* PROVIDER *//
interface DataProviderProps {
  children: React.ReactNode;
}

export const DataProvider: React.FC<DataProviderProps> = ({ children }) => {
  const { isAuthenticated } = useContext(AuthContext);

  const [savedPostsList, setSavedPostsList] = useState<string[]>([]);
  const [usersSearch, setUsersSearch] = useState<IUser[]>([]);

  const queryClient = useQueryClient();

  useEffect(() => {
    if (isAuthenticated === "authenticated") {
      onGetSavedPostsList();
    }
  }, []);

  //! get saved posts list
  const onGetSavedPostsList = async () => {
    const result = await savedPostsService("get");
    if (result.ok) {
      setSavedPostsList(result.savedPostsList!);
    }
  };

  //! set a new saved post
  const onSetSavedPost = async (postId: string) => {
    setSavedPostsList((prev) => [...prev, postId]);

    const result = await savedPostsService("post", postId);
    if (result.ok) {
      onGetSavedPostsList();
    }
  };

  //! remove a saved post
  const onRemoveSavedPost = async (postId: string) => {
    setSavedPostsList((prev) => prev.filter((post) => post !== postId));

    const result = await savedPostsService("post", postId);
    if (result.ok) {
      queryClient.refetchQueries(["/saved"]);
      onGetSavedPostsList();
    }
  };

  //! remove a post
  const onRemovePost = async (postId: string) => {
    const result = await removePostService(postId);
    if (result.ok) queryClient.refetchQueries(["/all"]);
  };

  //! search users
  const onSearchUsers = async (search: string) => {
    if (search.length < 1) {
      setUsersSearch([]);
      return;
    }

    const result = await searchService(search);
    if (result.ok) {
      console.log(result);
      setUsersSearch(result.users!);
    }
  };

  return (
    <DataContext.Provider
      value={{
        // getter
        savedPostsList,
        usersSearch,

        // methods
        onGetSavedPostsList,
        onRemovePost,
        onRemoveSavedPost,
        onSearchUsers,
        onSetSavedPost,
      }}
    >
      {children}
    </DataContext.Provider>
  );
};
