import { useEffect } from "react";

//* layout *//
import { MainLayout } from "@/layouts";

//* components *//
import { FeedPosts, MoreOptionsModalMobile } from "@/components/post";

//* stores *//
import {
  useNavbarTopStore,
  usePostsStore,
  useRightSidebarStore,
} from "@/store";

const BookmarksPage = () => {
  const { onChangeSidebarItems } = useRightSidebarStore();
  const { postModal } = usePostsStore();
  const { onSetNavbarData } = useNavbarTopStore();

  useEffect(() => {
    onChangeSidebarItems({
      explorer: true,
      profile: true,
      relevant: false,
    });
    onSetNavbarData({ settingText: "Guardados" });
  }, []);

  return (
    <MainLayout
      title="Guardados | Evlun"
      description="Pagina para ver los posts guardados del usuario en Evlun"
    >
      <FeedPosts url="/saved" />
      {postModal ? <MoreOptionsModalMobile /> : null}
    </MainLayout>
  );
};

export default BookmarksPage;
