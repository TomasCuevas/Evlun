//* components *//
import { BackArrow, NavTextButton, NavText } from "@/components/navbar";

//* store *//
import { useAuthStore, useNavbarTopStore } from "@/store";

export const SettingsLocation: React.FC = () => {
  const { user } = useAuthStore();
  const { navbarData } = useNavbarTopStore();

  const { settingText, buttonOnClick, buttonText } = navbarData;

  return (
    <nav className="mx-auto flex h-full w-full items-center">
      <div className="flex h-full w-full items-center gap-[20px]">
        <BackArrow />
        <NavText textBig={settingText!} textSmall={`@${user?.username}`} />
        {navbarData.isButton && (
          <NavTextButton text={buttonText!} onClick={buttonOnClick} />
        )}
      </div>
    </nav>
  );
};
