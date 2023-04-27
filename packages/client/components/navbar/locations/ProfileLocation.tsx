//* components *//
import { BackArrow } from "@/components/navbar";

//* store *//
import { useNavbarTopStore } from "@/store";

export const ProfileLocation: React.FC = () => {
  const {
    navbarData: { profileName },
  } = useNavbarTopStore();

  return (
    <nav className="mx-auto flex h-full w-full items-center gap-[30px]">
      <div className="flex h-full w-full items-center gap-[20px]">
        <BackArrow />
        <span
          className="cursor-pointer font-bold text-orange xs:text-lg"
          onClick={() => window.scrollTo(0, 0)}
        >
          {profileName}
        </span>
      </div>
    </nav>
  );
};
