import { useContext } from "react";
import Link from "next/link";
import { IconType } from "react-icons/lib";

//* context *//
import { UIContext } from "../../context";

//* interface *//
interface Props {
  icon: IconType;
  link: string;
  onClick?: any;
  text: string;
}

export const SidebarMobileLink: React.FC<Props> = ({
  icon: Icon,
  link,
  onClick,
  text,
}) => {
  const { onSwitchSidebar } = useContext(UIContext);

  return (
    <li>
      <Link href={link} passHref>
        <a
          onClick={() => {
            onSwitchSidebar();
            onClick ? onClick() : null;
          }}
          className="flex h-[50px] w-full items-center gap-[10px] px-4 transition-all duration-300 hover:bg-orange/5"
        >
          <Icon className="text-2xl text-orange" />
          <span className=" font-light text-white">{text}</span>
        </a>
      </Link>
    </li>
  );
};
