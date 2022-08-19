import { usePostsStore } from '../../hooks';

//* layout *//
import { Post } from '../';

//* context *//
import { PostContext } from '../../context';

export const FeedSavedPosts = () => {
  const { savedPosts } = usePostsStore();

  return (
    <section>
      <div className="flex flex-col">
        {savedPosts.map((post) => (
          <PostContext.Provider key={post._id} value={{ ...post }}>
            <Post />
          </PostContext.Provider>
        ))}
      </div>
    </section>
  );
};
