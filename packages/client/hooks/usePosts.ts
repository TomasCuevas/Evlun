import { useInfiniteQuery } from "@tanstack/react-query";

//* service *//
import { getPostsService } from "@/services";

//* interface *//
import { IPost } from "@/interfaces";

export const usePosts = (url: string) => {
  const postsQuery = useInfiniteQuery<IPost[]>(
    [`${url}`],
    ({ pageParam }) => getPostsService({ pageParam, url }),
    {
      getNextPageParam: (lastPage, pages) => {
        if (lastPage.length < 20) return;

        return pages.length;
      },
    }
  );

  return {
    posts: postsQuery.data?.pages.flat() || [],
    postsQuery,
  };
};
