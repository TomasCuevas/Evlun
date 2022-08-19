//* components *//
import { AvatarSection, PostFormSection } from '../../components/NewPost';

export const NewPost = () => {
  return (
    <article className="flex w-full gap-[10px] border-b border-decorateorange  bg-decorateorange/10 pt-[30px] pl-[5%] pr-[5%]">
      <AvatarSection />
      <PostFormSection />
    </article>
  );
};
