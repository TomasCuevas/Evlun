import { useState, useEffect } from 'react';

//* icons *//
import {
  MdOutlineChatBubbleOutline,
  MdOutlineFavorite,
  MdOutlineFavoriteBorder,
} from 'react-icons/md';

//* hooks *//
import { useAuthStore, usePostsStore } from '../../hooks';

export const OpenPostBottom = () => {
  const { openPost, startLikeToAPost } = usePostsStore();
  const { _id } = useAuthStore();

  const [liked, setLiked] = useState(false);

  const onLike = async (event) => {
    event.stopPropagation();
    await startLikeToAPost(openPost._id, true);
  };

  const onUnlike = async (event) => {
    event.stopPropagation();
    await startLikeToAPost(openPost._id, true);
  };

  useEffect(() => {
    setLiked(openPost.likes?.includes(_id));
  }, [openPost]);

  return (
    <section className="flex w-full items-center justify-around gap-[100px] border-b border-decorateorange py-[10px] pl-[5%] pr-[5%] text-decorateorange/50">
      <div>
        <MdOutlineChatBubbleOutline className="text-2xl" />
      </div>
      <div>
        {liked ? (
          <MdOutlineFavorite
            onClick={onUnlike}
            className="cursor-pointer text-2xl text-decorateorange hover:text-decorateorange/50"
          />
        ) : (
          <MdOutlineFavoriteBorder
            onClick={onLike}
            className="cursor-pointer text-2xl hover:text-decorateorange"
          />
        )}
      </div>
    </section>
  );
};
