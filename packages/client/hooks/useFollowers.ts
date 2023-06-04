import { useInfiniteQuery } from "@tanstack/react-query";

//* service *//
import { getFollowersService } from "@/services";

//* interface *//
import { IUser } from "@/interfaces";

export const useFollowers = (userId: string) => {
  const followersQuery = useInfiniteQuery<IUser[]>(
    [`/${userId}/followers`],
    ({ pageParam }) => getFollowersService(userId, pageParam),
    {
      getNextPageParam: (lastPage, pages) => {
        if (lastPage.length < 20) return;

        return pages.length;
      },
    }
  );

  return {
    followers: followersQuery.data?.pages.flat() || [],
    followersQuery,
  };
};
