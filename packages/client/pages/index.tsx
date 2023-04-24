import { useEffect } from "react";

//* layout *//
import { MainLayout } from "@/layouts";

//* components *//
import { FeedPosts, MoreOptionsModalMobile, NewPost } from "@/components/post";

//* stores *//
import { usePostsStore, useRightSidebarStore } from "@/store";

const HomePage = () => {
  const { onChangeSidebarItems } = useRightSidebarStore();
  const { postModal } = usePostsStore();

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
      <FeedPosts url="/all" />
      {postModal ? <MoreOptionsModalMobile /> : null}
    </MainLayout>
  );
};

export default HomePage;
