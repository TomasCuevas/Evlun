import { useEffect } from "react";

//* layout *//
import { MainLayout } from "@/layouts";

//* components *//
import { FeedPosts, MoreOptionsModalMobile, NewPost } from "@/components/post";

//* stores *//
import {
  useNavbarTopStore,
  usePostsStore,
  useRightSidebarStore,
} from "@/store";

const HomePage = () => {
  const { onChangeSidebarItems } = useRightSidebarStore();
  const { postModal } = usePostsStore();
  const {
    navbarData: { homeLocation },
  } = useNavbarTopStore();

  useEffect(() => {
    onChangeSidebarItems({
      explorer: true,
      profile: true,
      relevant: false,
    });
  }, []);

  return (
    <MainLayout title="Inicio | Evlun" description="Pagina principal de Evlun">
      <NewPost />

      {homeLocation === "all" && <FeedPosts url="/all" />}
      {homeLocation === "following" && <FeedPosts url="/following" />}

      {postModal ? <MoreOptionsModalMobile /> : null}
    </MainLayout>
  );
};

export default HomePage;
