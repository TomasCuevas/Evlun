export const NavText = ({ textBig, textSmall }) => {
  return (
    <div className="flex h-full w-full flex-col justify-center">
      <span className="font-bold text-decorateorange">{textBig}</span>
      <span className="text-xs font-light text-text">{textSmall}</span>
    </div>
  );
};
