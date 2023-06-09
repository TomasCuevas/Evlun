import { useEffect } from "react";
import { useInView } from "react-intersection-observer";

//* components *//
import { Loader } from "@/components/ui";
import { Post } from "@/components/post";

//* hooks *//
import { usePosts } from "@/hooks";

//* interface *//
interface Props {
  url: string;
}

export const FeedPosts: React.FC<Props> = ({ url }) => {
  const { postsQuery, posts } = usePosts(url);
  const { ref, inView } = useInView();

  useEffect(() => {
    if (inView && !postsQuery.isFetching) {
      postsQuery.fetchNextPage();
    }
  }, [inView]);

  return (
    <section className="flex flex-col">
      {postsQuery.isFetching && posts.length > 0 ? <Loader /> : null}
      {posts.map((post) => (
        <Post key={post._id} post={post} />
      ))}
      {postsQuery.isFetching ? <Loader /> : null}
      <div ref={ref} className="h-2 w-full"></div>
    </section>
  );
};
