//* hooks *//
import { usePostsStore } from '../../hooks/usePostsStore';

export const OpenPostContent = () => {
  const { openPost } = usePostsStore();

  return (
    <section className="mt-[20px] pl-[5%] pr-[5%]">
      <div className="w-full break-words">
        <span className="text-[23px] leading-7 text-text/80">
          {openPost.content}
        </span>
      </div>
    </section>
  );
};
