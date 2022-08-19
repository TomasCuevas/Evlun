//* components *//
import { AvatarSection, Bottom, Content, Top } from '../../components/Comment';

export const Comment = () => {
  return (
    <article className="max-w-screen grid w-full grid-cols-[45px_calc(100%_-_55px)] gap-[10px] border-b border-decorateorange py-[10px] px-0 pl-[5%] pr-[5%] hover:bg-decorateorange/5">
      <AvatarSection />
      <div className="flex max-w-full flex-col">
        <Top />
        <Content />
        <Bottom />
      </div>
    </article>
  );
};
