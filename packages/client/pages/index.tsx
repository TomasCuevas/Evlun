import { useContext, useEffect } from "react";
import { useRouter } from "next/router";

//* layout *//
import { MainLayout } from "../components/layouts";

//* components *//
import { FullLoader } from "../components/ui";
import { FeedPosts, MoreOptionsModalMobile, NewPost } from "../components/post";

//* context *//
import { AuthContext, RightSidebarContext, UIContext } from "../context";

const HomePage = () => {
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
        title="Inicio | Evlun"
        description="Pagina principal de Evlun"
      >
        <NewPost />
        <FeedPosts url="/all" />
        {postModal && isAuthenticated === "authenticated" ? (
          <MoreOptionsModalMobile />
        ) : null}
      </MainLayout>
    );
  }

  return <FullLoader />;
};

export default HomePage;
