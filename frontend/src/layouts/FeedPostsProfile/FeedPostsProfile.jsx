//* layout *//
import { Post } from '../';

//* hooks *//
import { useProfileStore } from '../../hooks/useProfileStore';

//* context *//
import { PostContext } from '../../context';

export const FeedPostsProfile = () => {
  const { posts } = useProfileStore();

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
