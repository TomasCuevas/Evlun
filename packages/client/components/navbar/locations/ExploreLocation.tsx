//* components *//
import { Explore } from "@/components/explore";

//* store *//
import { useAuthStore, useUiStore } from "@/store";

export const ExploreLocation: React.FC = () => {
  const { user } = useAuthStore();
  const { onSwitchMobileSidebar } = useUiStore();

  return (
    <nav className="flex h-full w-full items-center gap-[30px]">
      {user ? (
        <div className="min-h-[30px] min-w-[30px]">
          <img
            src={user.avatar}
            alt="profile-img"
            className="h-[30px] w-[30px] cursor-pointer rounded-full object-cover object-center"
            onClick={onSwitchMobileSidebar}
          />
        </div>
      ) : null}
      <Explore />
    </nav>
  );
};
