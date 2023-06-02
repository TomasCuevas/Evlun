//* interface *//
interface Props {
  strong: string;
  text: string;
  textAfterStrong?: string;
}

export const HeroText: React.FC<Props> = ({
  strong,
  text,
  textAfterStrong,
}) => {
  return (
    <h1 className="block pt-[50px] text-5xl font-medium italic leading-[70px] tracking-[10px] text-white xs:text-6xl sm:text-7xl md:pt-[100px]">
      {text + " "}
      <strong className="text-6xl font-bold text-orange xs:text-7xl sm:text-8xl">
        {" " + strong + " "}
      </strong>
      {textAfterStrong}
    </h1>
  );
};
