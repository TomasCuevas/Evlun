import { useInfiniteQuery } from "@tanstack/react-query";

//* service *//
import { getFollowingService } from "@/services";

//* interface *//
import { IUser } from "@/interfaces";

export const useFollowing = (userId: string) => {
  const followingQuery = useInfiniteQuery<IUser[]>(
    [`/${userId}/following`],
    ({ pageParam }) => getFollowingService(userId, pageParam),
    {
      getNextPageParam: (lastPage, pages) => {
        if (lastPage.length < 20) return;

        return pages.length;
      },
    }
  );

  return {
    following: followingQuery.data?.pages.flat() || [],
    followingQuery,
  };
};
