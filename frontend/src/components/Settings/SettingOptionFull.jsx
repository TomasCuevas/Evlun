import { useNavigate } from 'react-router-dom';

//* icons *//
import { BsChevronRight } from 'react-icons/bs';

export const SettingOptionFull = ({
  icon: Icon,
  optionTitle,
  optionText,
  navigateLink,
}) => {
  const navigate = useNavigate();

  const settingNavigate = () => navigate(navigateLink);

  return (
    <div
      onClick={settingNavigate}
      className="flex min-h-[50px] cursor-pointer items-center gap-[15px] py-[15px] px-[5%] transition-all duration-300 hover:bg-decorateorange/5"
    >
      <div className="mx-[10px]">
        <Icon className="text-xl text-decorateorange" />
      </div>
      <div className="flex flex-col">
        <span className="text-base text-text">{optionTitle}</span>
        <span className="pt-[2px] text-sm text-text/50">{optionText}</span>
      </div>
      <div className="ml-auto">
        <BsChevronRight className="text-lg text-decorateorange" />
      </div>
    </div>
  );
};
