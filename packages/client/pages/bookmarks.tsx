import { useContext, useEffect } from "react";
import { useRouter } from "next/router";

//* layout *//
import { MainLayout } from "../components/layouts";

//* components *//
import { FullLoader } from "../components/ui";
import { FeedPosts, MoreOptionsModalMobile } from "../components/post";

//* context *//
import { AuthContext, RightSidebarContext, UIContext } from "../context";

const BookmarksPage = () => {
  const { isAuthenticated } = useContext(AuthContext);
  const { postModal } = useContext(UIContext);
  const { onChangeSidebarItems } = useContext(RightSidebarContext);

  const router = useRouter();

  useEffect(() => {
    onChangeSidebarItems({
      explorer: true,
      profile: true,
      relevant: false,
    });
  }, []);

  if (isAuthenticated === "no-authenticated") router.replace("/auth/login");
  if (isAuthenticated === "authenticated") {
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
  }

  return <FullLoader />;
};

export default BookmarksPage;