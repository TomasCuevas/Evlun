//* interfaces *//
import { IconType } from "react-icons/lib";

interface Props {
  color?: string;
  icon: IconType;
  text: string;
  onClick: () => void;
}

export const MoreOption: React.FC<Props> = ({
  color,
  icon: Icon,
  text,
  onClick,
}) => {
  return (
    <li
      onClick={onClick}
      className="flex cursor-pointer list-none items-center gap-[15px] py-[15px] px-[5%] font-light text-white transition-all duration-300 hover:bg-white  hover:font-semibold hover:text-bluedark"
    >
      <Icon className="text-sm" style={{ color: color && `${color}` }} />
      <span className="text-base" style={{ color: color && `${color}` }}>
        {text}
      </span>
    </li>
  );
};
