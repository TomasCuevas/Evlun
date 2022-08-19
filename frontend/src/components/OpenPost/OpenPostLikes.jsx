import { useEffect, useState } from 'react';

//* hooks *//
import { usePostsStore } from '../../hooks';

export const OpenPostLikes = () => {
  const { openPost } = usePostsStore();
  const [likesLength, setLikesLength] = useState(0);

  useEffect(() => {
    setLikesLength(openPost.likes?.length > 0 ? openPost.likes.length : 0);
  }, [openPost]);

  if (likesLength === 0) return <></>;

  return (
    <section className="w-full border-b border-decorateorange py-[15px] pl-[5%] pr-[5%]">
      <div className="flex items-center gap-2">
        <span className="text-base font-bold text-text">{likesLength}</span>
        <span className="text-sm font-light text-decorateorange">Likes</span>
      </div>
    </section>
  );
};
