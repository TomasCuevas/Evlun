import { useContext } from "react";
import { useRouter } from "next/router";

//* layout *//
import { MainLayout } from "../components/layouts";

//* components *//
import { FullLoader } from "../components/ui";
import { FeedPosts, MoreOptionsModal, NewPost } from "../components/post";

//* context *//
import { AuthContext, UIContext } from "../context";

const HomePage = () => {
  const { isAuthenticated } = useContext(AuthContext);
  const { postModal } = useContext(UIContext);

  const router = useRouter();

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
          <MoreOptionsModal />
        ) : null}
      </MainLayout>
    );
  }

  return <FullLoader />;
};

export default HomePage;
