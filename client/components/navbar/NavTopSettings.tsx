import { useContext } from "react";

//* components *//
import { BackArrow, NavTextButton, NavText } from "./";

//* context *//
import { AuthContext } from "../../context";

//* interface *//
interface Props {
  button?: boolean;
  buttonOnClick?: any;
  buttonText?: string;
  navText: string;
}

export const NavTopSettings: React.FC<Props> = ({
  button,
  buttonOnClick,
  buttonText,
  navText,
}) => {
  const { user } = useContext(AuthContext);

  return (
    <nav className="sticky top-0 z-10 h-[55px] w-full border-b-2 border-orange bg-background/5 px-4 backdrop-blur-3xl xs:h-[60px]">
      <div className="flex h-full w-full items-center gap-[20px]">
        <BackArrow />
        <NavText textBig={navText} textSmall={`@${user!.username}`} />
        {button ? (
          <NavTextButton text={buttonText!} onClick={buttonOnClick} />
        ) : null}
      </div>
    </nav>
  );
};
