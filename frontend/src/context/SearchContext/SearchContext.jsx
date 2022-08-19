import { useState, createContext, useEffect } from 'react';

//* hooks *//
import { useSearchUser } from '../../hooks';

export const SearchContext = createContext();

export const SearchProvider = ({ children }) => {
  const [search, setSearch] = useState('');
  const { users, isLoading, searchUsers } = useSearchUser();

  const onSearch = (toSearch) => {
    setSearch(toSearch);
  };

  useEffect(() => {
    searchUsers(search);
  }, [search]);

  return (
    <SearchContext.Provider
      value={{
        // properties
        users,
        isLoading,

        // methods
        onSearch,
      }}
    >
      {children}
    </SearchContext.Provider>
  );
};
