import { useNavigate } from 'react-router-dom';

//* icons *//
import { BsChevronRight } from 'react-icons/bs';

export const SettingOption = ({
  optionTitle,
  optionText,
  navigateLink,
  arrow = true,
}) => {
  const navigate = useNavigate();

  const settingNavigate = () => navigate(navigateLink);

  return (
    <div
      onClick={() => {
        if (arrow) settingNavigate();
      }}
      className="flex min-h-[60px] w-full cursor-pointer items-center justify-between py-[15px] px-[5%] transition-all  duration-300 hover:bg-decorateorange/5"
    >
      <div className="flex flex-col">
        <span className="text-base text-text">{optionTitle}</span>
        <span className="text-sm text-decorateorange">{optionText}</span>
      </div>
      {arrow && (
        <div className="ml-auto">
          <BsChevronRight className="text-base text-decorateorange" />
        </div>
      )}
    </div>
  );
};
