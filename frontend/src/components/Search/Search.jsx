import { useNavigate } from 'react-router-dom';

export const Search = ({ avatar, name, username }) => {
  const navigate = useNavigate();

  return (
    <article
      onClick={() => navigate(`/profile/${username}`)}
      className="flex h-[85px] w-full cursor-pointer items-center gap-3 px-[5%] transition-all duration-300 hover:bg-decorateorange/5"
    >
      <div className="w-[55px]">
        <img
          src={avatar}
          alt="avatar"
          className="h-[55px] min-w-[55px] rounded-full object-cover object-center"
        />
      </div>
      <div className="flex w-full flex-col">
        <span className="text-lg font-black text-text">{name}</span>
        <span className="text-sm font-light text-decorateorange/70">
          @{username}
        </span>
      </div>
    </article>
  );
};
