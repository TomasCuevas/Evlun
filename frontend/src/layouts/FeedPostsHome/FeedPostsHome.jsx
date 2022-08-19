//* layout *//
import { Post } from '../';

//* hooks *//
import { usePostsStore } from '../../hooks/usePostsStore';

//* context *//
import { PostContext } from '../../context';

export const FeedPostsHome = () => {
  const { posts } = usePostsStore();

  return (
    <section>
      <div className="flex flex-col">
        {posts.map((post) => (
          <PostContext.Provider key={post._id} value={{ ...post }}>
            <Post />
          </PostContext.Provider>
        ))}
      </div>
    </section>
  );
};
