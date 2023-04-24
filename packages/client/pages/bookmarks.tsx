import { useEffect } from "react";

//* layout *//
import { MainLayout } from "@/layouts";

//* components *//
import { FeedPosts, MoreOptionsModalMobile } from "@/components/post";

//* stores *//
import { usePostsStore, useRightSidebarStore } from "@/store";

const BookmarksPage = () => {
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
    <MainLayout
      navText="Guardados"
      title="Guardados | Evlun"
      description="Pagina para ver los posts guardados del usuario en Evlun"
      location="bookmarks"
    >
      <FeedPosts url="/saved" />
      {postModal ? <MoreOptionsModalMobile /> : null}
    </MainLayout>
  );
};

export default BookmarksPage;
