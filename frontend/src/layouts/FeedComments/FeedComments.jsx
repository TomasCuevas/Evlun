//* components *//
import { Loading } from '../../components/Loading/Loading';

//* layout *//
import { Comment } from '../';

//* hooks *//
import { useCommentsStore } from '../../hooks';

//* context *//
import { CommentContext } from '../../context';

export const FeedComments = () => {
  const { comments, isLoading } = useCommentsStore();

  if (isLoading) return <Loading />;

  return (
    <section>
      <div className="flex flex-col">
        {comments.map((comment) => (
          <CommentContext.Provider key={comment._id} value={{ ...comment }}>
            <Comment />
          </CommentContext.Provider>
        ))}
      </div>
    </section>
  );
};
