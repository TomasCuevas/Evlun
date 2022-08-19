//* components *//
import {
  OpenPostBottom,
  OpenPostContent,
  OpenPostDate,
  OpenPostLikes,
  OpenPostTop,
} from '../../components/OpenPost';

export const OpenPost = () => {
  return (
    <article className="mt-[20px] flex flex-col">
      <OpenPostTop />
      <OpenPostContent />
      <OpenPostDate />
      <OpenPostLikes />
      <OpenPostBottom />
    </article>
  );
};
