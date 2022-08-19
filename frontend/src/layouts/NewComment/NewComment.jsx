//* components *//
import { AvatarSection } from '../../components/NewPost';
import { CommentFormSection } from '../../components/NewComment';

export const NewComment = () => {
  return (
    <article className="flex w-full gap-[10px] border-b border-decorateorange bg-decorateorange/10 pt-[15px] pl-[5%] pr-[5%]">
      <AvatarSection />
      <CommentFormSection />
    </article>
  );
};
