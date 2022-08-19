import { useState, useEffect, useContext } from 'react';

//* icons *//
import { MdOutlineFavoriteBorder, MdOutlineFavorite } from 'react-icons/md';

//* hooks *//
import { useAuthStore, useCommentsStore } from '../../hooks';

//* context *//
import { CommentContext } from '../../context';

export const Bottom = () => {
  const { likes, _id: commentId } = useContext(CommentContext);
  const { _id } = useAuthStore();
  const { startLikeToAComment } = useCommentsStore();
  const [like, setLike] = useState(false);
  const [likesCount, setLikesCount] = useState(likes.length);

  const onLike = async (event) => {
    event.stopPropagation();
    setLike(true);
    setLikesCount(likesCount + 1);
    await startLikeToAComment(commentId);
  };

  const onUnlike = async (event) => {
    event.stopPropagation();
    setLike(false);
    setLikesCount(likesCount - 1);
    await startLikeToAComment(commentId);
  };

  useEffect(() => {
    if (likes.includes(_id)) setLike(true);
  }, []);

  return (
    <section className="mt-[10px] flex h-[22px] w-full items-center gap-[100px] text-decorateorange">
      <div className="flex h-full items-center gap-[10px]">
        {like ? (
          <span>
            <MdOutlineFavorite
              onClick={onUnlike}
              className="cursor-pointer text-[21px] text-decorateorange hover:text-decorateorange/50"
            />
          </span>
        ) : (
          <MdOutlineFavoriteBorder
            onClick={onLike}
            className="cursor-pointer text-[21px] text-decorateorange/50 hover:text-decorateorange/100"
          />
        )}
        <span className="text-base font-light">{likesCount}</span>
      </div>
    </section>
  );
};
