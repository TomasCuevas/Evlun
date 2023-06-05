import { useQuery } from "@tanstack/react-query";

//* service *//
import { getUserService } from "@/services";

//* interface *//
import { IUser } from "@/interfaces";

export const useUser = (username: string) => {
  const userQuery = useQuery<IUser>([`/user/${username}`], () =>
    getUserService(username)
  );

  return {
    user: userQuery.data,
    userQuery,
  };
};
