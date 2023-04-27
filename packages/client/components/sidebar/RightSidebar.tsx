//* components *//
import { Explore, FeedExploreModal } from "@/components/explore";
import { ProfileInfo, RelevantPersons } from "@/components/sidebar";

//* stores *//
import { useRightSidebarStore } from "@/store";

export const RightSidebar: React.FC = () => {
  const { sidebarItems } = useRightSidebarStore();

  return (
    <aside className="top-0 hidden w-full max-w-[350px] flex-col px-4 py-2 xl:sticky xl:flex">
      {sidebarItems.explorer && (
        <>
          <Explore />
          <FeedExploreModal />
        </>
      )}
      {sidebarItems.profile && <ProfileInfo />}
      {sidebarItems.relevant && <RelevantPersons />}
    </aside>
  );
};
