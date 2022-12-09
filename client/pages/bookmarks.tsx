import { useContext } from "react";
import { useRouter } from "next/router";

//* layout *//
import { MainLayout } from "../components/layouts";

//* components *//
import { FullLoader } from "../components/ui";
import { FeedPosts, MoreOptionsModal } from "../components/post";

//* context *//
import { AuthContext } from "../context/AuthContext";
import { UIContext } from "../context/UIContext";

const BookmarksPage = () => {
  const { isAuthenticated } = useContext(AuthContext);
  const { postModal } = useContext(UIContext);

  const router = useRouter();

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
        {postModal ? <MoreOptionsModal /> : null}
      </MainLayout>
    );
  }

  return <FullLoader />;
};

export default BookmarksPage;
