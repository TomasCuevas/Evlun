//* interface *//
interface Props {
  textBig: string;
  textSmall: string;
}

export const NavText: React.FC<Props> = ({ textBig, textSmall }) => {
  return (
    <div className="flex h-full w-full flex-col justify-center">
      <span className="font-bold text-orange xs:text-xl">{textBig}</span>
      <span className="text-xs font-light leading-3 text-gray-300">
        {textSmall}
      </span>
    </div>
  );
};
