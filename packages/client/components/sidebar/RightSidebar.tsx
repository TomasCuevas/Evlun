//* components *//
import { Explore, FeedExploreModal } from "@/components/explore";
import { ProfileInfo, RelevantPersons, NewToEvlun } from "@/components/sidebar";

//* stores *//
import { useAuthStore, useRightSidebarStore } from "@/store";

export const RightSidebar: React.FC = () => {
  const { isAuthenticated } = useAuthStore();
  const { sidebarItems } = useRightSidebarStore();

  return (
    <aside className="top-0 hidden w-full max-w-[350px] flex-col px-4 py-2 xl:sticky xl:flex">
      {sidebarItems.explorer && (
        <>
          <Explore />
          <FeedExploreModal />
        </>
      )}
      {isAuthenticated === "no-authenticated" && <NewToEvlun />}
      {sidebarItems.profile && <ProfileInfo />}
      {sidebarItems.relevant && <RelevantPersons />}
    </aside>
  );
};
