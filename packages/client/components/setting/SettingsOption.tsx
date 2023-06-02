import NextLink from "next/link";

//* icons *//
import { BsChevronRight } from "react-icons/bs";

//* interface *//
interface Props {
  arrow?: boolean;
  navigateLink: string;
  optionText?: string | number;
  optionTitle: string;
}

export const SettingsOption: React.FC<Props> = ({
  arrow = true,
  navigateLink,
  optionText,
  optionTitle,
}) => {
  return (
    <NextLink href={navigateLink} passHref>
      <a>
        <div className="flex min-h-[60px] w-full cursor-pointer items-center justify-between py-[15px] px-4 hover:bg-orange/5">
          <div className="flex flex-col">
            <span className="text-base text-white">{optionTitle}</span>
            {optionText ? (
              <span className="text-sm text-orange">{optionText}</span>
            ) : null}
          </div>
          {arrow && (
            <div className="ml-auto">
              <BsChevronRight className="text-base text-orange" />
            </div>
          )}
        </div>
      </a>
    </NextLink>
  );
};
