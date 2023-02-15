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
      className="flex cursor-pointer list-none items-center gap-4 py-4 px-4 font-bold text-white transition-all duration-100 hover:bg-white/10 "
    >
      <Icon className="text-base" style={{ color: color && `${color}` }} />
      <span className="text-base" style={{ color: color && `${color}` }}>
        {text}
      </span>
    </li>
  );
};
