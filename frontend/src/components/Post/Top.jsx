import { useContext } from 'react';
import { useNavigate } from 'react-router-dom';

/**
 * @icons
 */
import { MdMoreHoriz } from 'react-icons/md';

/**
 * @helpers
 */
import { getRelativeTime } from '../../helpers/getRelativeTime';

/**
 * @hooks
 */
import { usePostsStore } from '../../hooks';

//* context *//
import { PostContext } from '../../context';

export const Top = () => {
  const { added_by: addedBy, date, _id } = useContext(PostContext);
  const { setMore } = usePostsStore();
  const navigate = useNavigate();

  const relativeTime = getRelativeTime(date);

  const onNavigate = (event) => {
    event.stopPropagation();
    navigate(`/profile/${addedBy.username}`);
  };

  const onMore = (event) => {
    event.stopPropagation();
    setMore(addedBy, _id);
  };

  return (
    <section className="mb-[2px] grid h-[20px] w-full max-w-full grid-cols-[calc(90%_-_20px)_10%] gap-[20px]">
      <div className="flex h-full w-full items-start justify-start gap-[5px]">
        <div
          onClick={onNavigate}
          className="max-w-[45%] overflow-hidden text-ellipsis whitespace-nowrap text-text"
        >
          <span className="w-full cursor-pointer text-ellipsis text-sm font-bold">
            {addedBy.name}
          </span>
        </div>
        <div
          onClick={onNavigate}
          className="max-w-[45%] overflow-hidden text-ellipsis whitespace-nowrap text-decorateorange/70"
        >
          <span className="cursor-pointer text-ellipsis text-sm">{`@${addedBy.username}`}</span>
        </div>
        <div className="my-0 mx-[2px] flex h-full items-center text-text">
          <span>·</span>
        </div>
        <div className="overflow-hidden whitespace-nowrap">
          <span className="text-ellipsis text-[13px] font-bold text-text">
            {relativeTime}
          </span>
        </div>
      </div>

      <div className="flex h-full w-full items-start justify-center">
        <div onClick={onMore}>
          <MdMoreHoriz className="cursor-pointer text-xl text-text hover:text-decorateorange" />
        </div>
      </div>
    </section>
  );
};
