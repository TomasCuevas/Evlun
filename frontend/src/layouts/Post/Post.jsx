import { useContext } from 'react';
import { useNavigate } from 'react-router-dom';

//* components *//
import { AvatarSection, Bottom, Content, Top } from '../../components/Post';

//* context *//
import { PostContext } from '../../context';

export const Post = () => {
  const { _id } = useContext(PostContext);
  const navigate = useNavigate();

  const onNavigate = () => {
    navigate(`/post/${_id}`);
  };

  return (
    <article
      onClick={onNavigate}
      className="max-w-screen grid w-full cursor-pointer grid-cols-[45px_calc(100%_-_55px)] gap-[10px] border-b border-decorateorange py-[10px] px-0 pl-[5%] pr-[5%] hover:bg-decorateorange/5"
    >
      <AvatarSection />
      <div className="flex max-w-full flex-col">
        <Top />
        <Content />
        <Bottom />
      </div>
    </article>
  );
};
