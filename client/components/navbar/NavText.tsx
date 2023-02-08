//* interface *//
interface Props {
  textBig: string;
  textSmall: string;
}

export const NavText: React.FC<Props> = ({ textBig, textSmall }) => {
  return (
    <div className="flex h-full w-full flex-col justify-center">
      <span className="font-bold text-orange xs:text-lg">{textBig}</span>
      <span className="text-sm font-light text-white">{textSmall}</span>
    </div>
  );
};
