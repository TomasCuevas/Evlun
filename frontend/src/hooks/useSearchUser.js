import { useState } from 'react';

//* api axios *//
import { userApi } from '../apis';

export const useSearchUser = () => {
  const [users, setUsers] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const searchUsers = async (search) => {
    try {
      if (search.length < 1) {
        setUsers([]);
        setIsLoading(false);
        return;
      }

      if (isLoading) return;
      setIsLoading(true);

      const { data } = await userApi.get(`/search?search=${search}`);

      setUsers(data.users);
      setIsLoading(false);
    } catch (error) {
      console.error(error);
      setIsLoading(false);
    }
  };

  return {
    // properties
    users,
    isLoading,

    // methods
    searchUsers,
  };
};
