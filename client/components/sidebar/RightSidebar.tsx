import { useContext } from "react";

//* components *//
import { Explore, FeedExploreModal } from "../explore";
import { ProfileInfoSidebar } from "../profile";

//* context *//
import { AuthContext, RightSidebarContext } from "../../context";

export const RightSidebar: React.FC = () => {
  const { isAuthenticated } = useContext(AuthContext);
  const { sidebarItems } = useContext(RightSidebarContext);

  return (
    <aside className="top-0 hidden w-full max-w-[350px] flex-col px-4 py-2 xl:sticky xl:flex">
      {sidebarItems.explorer && (
        <>
          <Explore />
          <FeedExploreModal />
        </>
      )}
      {sidebarItems.profile && isAuthenticated === "authenticated" && (
        <ProfileInfoSidebar />
      )}
    </aside>
  );
};
