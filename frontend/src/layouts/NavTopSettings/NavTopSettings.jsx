//* components *//
import { Back } from '../../components/NavTop/Back';
import { NavText } from '../../components/NavTop/NavText';

//* hooks *//
import { useAuthStore } from '../../hooks';

export const NavTopSettings = ({
  navText,
  button: Button,
  buttonText,
  onClick,
}) => {
  const { username } = useAuthStore();

  return (
    <div className="sticky top-0 z-10 h-[55px] w-full border-b-2 border-decorateorange bg-darkbackground/5 backdrop-blur-xl">
      <div className="mx-auto w-[90%]">
        <div className="flex h-[50px] w-full items-center gap-[20px]">
          <Back />
          <NavText textBig={navText} textSmall={`@${username}`} />
          {Button && <Button text={buttonText} onClick={onClick} />}
        </div>
      </div>
    </div>
  );
};
