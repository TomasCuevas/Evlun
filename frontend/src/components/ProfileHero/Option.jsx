export const Option = ({ text, icon: Icon, navigate }) => {
  if (Icon) {
    return (
      <div className="flex h-[35px] cursor-pointer items-center justify-center rounded-full border border-decorateorange p-2 transition-all duration-300 hover:bg-decorateorange/10">
        <Icon className="text-[22px] text-decorateorange" />
      </div>
    );
  } else {
    return (
      <div
        onClick={navigate}
        className="flex h-full cursor-pointer items-center justify-center rounded-full border border-decorateorange py-[7px] px-[10px] transition-all duration-300 hover:bg-decorateorange/10"
      >
        <span className="text-[15px] font-bold text-text">{text}</span>
      </div>
    );
  }
};
