import { IconType } from "react-icons/lib";

//* interface *//
interface Props {
  color?: string;
  icon: IconType;
  text: string;
  onClick?: (event: any) => void;
}

export const MoreOption: React.FC<Props> = ({
  color,
  icon: Icon,
  text,
  onClick,
}) => {
  return (
    <li onClick={onClick}>
      <button
        type="button"
        className="flex w-full items-center gap-4 p-4 font-bold text-white hover:bg-white/10 xs:py-3 xs:pl-4 xs:pr-10"
      >
        <Icon className="text-base" style={{ color: color && `${color}` }} />
        <span
          className="whitespace-nowrap text-base"
          style={{ color: color && `${color}` }}
        >
          {text}
        </span>
      </button>
    </li>
  );
};
