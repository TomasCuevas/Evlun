export const ButtonNavbar = ({ text, onClick }) => {
  return (
    <div
      onClick={onClick}
      className="flex cursor-pointer items-center justify-center rounded-full border border-decorateorange py-[7px] px-[14px] transition-all duration-300 hover:bg-decorateorange/10"
    >
      <span className="text-[15px] font-bold text-text">{text}</span>
    </div>
  );
};
