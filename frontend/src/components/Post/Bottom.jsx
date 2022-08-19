import { useState, useEffect, useContext } from 'react';

//* icons *//
import {
  MdOutlineChatBubbleOutline,
  MdOutlineFavoriteBorder,
  MdOutlineFavorite,
} from 'react-icons/md';

//* hooks *//
import { useAuthStore, usePostsStore } from '../../hooks';

//* context *//
import { PostContext } from '../../context';

export const Bottom = () => {
  const { _id: postId, comments, likes } = useContext(PostContext);

  const { _id: userId } = useAuthStore();
  const { startLikeToAPost } = usePostsStore();

  const [like, setLike] = useState(false);
  const [likeslength, setLikesLength] = useState(0);
  const [commentsLength, setCommentsLength] = useState(0);

  const onLike = async (event) => {
    event.stopPropagation();
    await startLikeToAPost(postId);
  };

  useEffect(() => {
    setLike(likes.includes(userId));
    setLikesLength(likes.length);
    setCommentsLength(comments.length);
  }, [comments, likes]);

  return (
    <section className="mt-[10px] flex h-[22px] w-full items-center gap-[100px] text-decorateorange">
      <div className="flex h-full items-center gap-[10px]">
        <MdOutlineChatBubbleOutline className="text-xl text-decorateorange/50" />
        <span className="text-base font-light">{commentsLength}</span>
      </div>

      <div className="flex h-full items-center gap-[10px]">
        {like ? (
          <span>
            <MdOutlineFavorite
              onClick={onLike}
              className="cursor-pointer text-[21px] text-decorateorange hover:text-decorateorange/50"
            />
          </span>
        ) : (
          <MdOutlineFavoriteBorder
            onClick={onLike}
            className="cursor-pointer text-[21px] text-decorateorange/50 hover:text-decorateorange/100"
          />
        )}
        <span className="text-base font-light">{likeslength}</span>
      </div>
    </section>
  );
};
