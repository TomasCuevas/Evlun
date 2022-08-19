import { useNavigate } from 'react-router-dom';

//* icons *//
import { MdMoreHoriz } from 'react-icons/md';

//* hooks *//
import { usePostsStore } from '../../hooks/usePostsStore';

export const OpenPostTop = () => {
  const navigate = useNavigate();
  const { openPost, setMore } = usePostsStore();

  const onNavigate = () => {
    navigate(`/profile/${openPost.added_by.username}`);
  };

  const onMore = (event) => {
    event.stopPropagation();
    setMore(openPost.added_by, openPost._id);
  };

  return (
    <section className="flex h-[50px] w-full justify-between pl-[5%] pr-[5%]">
      <div
        onClick={onNavigate}
        className="flex h-full min-w-[90%] max-w-[90%] gap-[10px]"
      >
        <div>
          <img
            src={openPost.added_by?.avatar}
            alt={openPost.added_by?.username}
            className="h-[45px] w-[45px] cursor-pointer rounded-full object-cover"
          />
        </div>
        <div className="flex flex-col overflow-hidden text-ellipsis whitespace-nowrap">
          <span className="cursor-pointer text-ellipsis text-base font-semibold  text-text">
            {openPost.added_by?.name}
          </span>
          <span className="cursor-pointer text-ellipsis text-base font-light text-decorateorange">
            @{openPost.added_by?.username}
          </span>
        </div>
      </div>

      <div className="flex h-full w-full items-start justify-center">
        <div onClick={onMore}>
          <MdMoreHoriz className="cursor-pointer text-[20px] text-text hover:text-decorateorange" />
        </div>
      </div>
    </section>
  );
};
