import NextLink from "next/link";

//* icons *//
import { IconType } from "react-icons/lib";
import { BsChevronRight } from "react-icons/bs";

interface Props {
  icon: IconType;
  navigateLink: string;
  optionText: string;
  optionTitle: string;
}

export const SettingsOptionFull: React.FC<Props> = ({
  icon: Icon,
  navigateLink,
  optionText,
  optionTitle,
}) => {
  return (
    <NextLink href={navigateLink} passHref>
      <a>
        <div className="flex min-h-[50px] cursor-pointer items-center gap-[15px] py-[15px] px-4 transition-all duration-300 hover:bg-orange/5">
          <div className="mx-[10px]">
            <Icon className="text-xl text-orange" />
          </div>
          <div className="flex flex-col">
            <span className="text-base text-white">{optionTitle}</span>
            <span className="pt-[2px] text-sm text-white/50">{optionText}</span>
          </div>
          <div className="ml-auto">
            <BsChevronRight className="text-lg text-orange" />
          </div>
        </div>
      </a>
    </NextLink>
  );
};
