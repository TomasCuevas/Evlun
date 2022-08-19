export const MoreOption = ({
  icon: Icon,
  text,
  dispatch,
  handleMore,
  color,
}) => {
  return (
    <li
      onClick={() => {
        dispatch();
        handleMore();
      }}
      className="flex cursor-pointer list-none items-center gap-[15px] py-[15px] px-[5%] font-light text-text transition-all duration-300 hover:bg-lightbackground  hover:font-semibold hover:text-darktext"
    >
      <Icon className="text-sm" style={{ color: color && `${color}` }} />
      <span className="text-base" style={{ color: color && `${color}` }}>
        {text}
      </span>
    </li>
  );
};
