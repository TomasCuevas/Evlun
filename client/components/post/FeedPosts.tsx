/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect } from "react";
import { useInView } from "react-intersection-observer";

//* components *//
import { Loader } from "../ui";
import { Post } from "./";

//* hooks *//
import { usePosts } from "../../hooks";

interface Props {
  url: string;
}

export const FeedPosts: React.FC<Props> = ({ url }) => {
  const { postsQuery } = usePosts(url);

  const { ref, inView } = useInView();

  useEffect(() => {
    if (inView && !postsQuery.isFetching) {
      postsQuery.fetchNextPage();
    }
  }, [inView]);

  return (
    <section className="flex flex-col">
      {postsQuery.data?.pages.flat().map((post) => (
        <Post key={post._id} post={post} />
      ))}
      {postsQuery.isFetching ? <Loader /> : null}
      <div ref={ref} className="h-2 w-full"></div>
    </section>
  );
};
