import { useContext } from 'react';
import { useNavigate } from 'react-router-dom';

//* context *//
import { CommentContext } from '../../context';

export const AvatarSection = () => {
  const { added_by: addedBy } = useContext(CommentContext);
  const navigate = useNavigate();

  const onNavigate = () => {
    navigate(`/profile/${addedBy.username}`);
  };

  return (
    <section className="flex w-full flex-col items-center">
      <img
        onClick={onNavigate}
        src={addedBy.avatar}
        alt={addedBy.name}
        className="h-[45px] w-[45px] cursor-pointer rounded-full object-cover"
      />
    </section>
  );
};
