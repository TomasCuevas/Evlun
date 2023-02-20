import { useContext, useEffect } from "react";
import { GetServerSideProps, NextPage } from "next";

//* service *//
import { getUserService } from "../../services";

//* layout *//
import { MainLayout } from "../../components/layouts";

//* components *//
import { ProfileHero } from "../../components/profile";
import { FeedPosts, MoreOptionsModalMobile } from "../../components/post";

//* context *//
import { AuthContext, RightSidebarContext, UIContext } from "../../context";

//* interfaces *//
import { IUser } from "../../interfaces/user";

interface Props {
  user: IUser;
}

const ProfilePage: NextPage<Props> = ({ user }) => {
  const { isAuthenticated } = useContext(AuthContext);
  const { postModal } = useContext(UIContext);
  const { onChangeSidebarItems } = useContext(RightSidebarContext);

  useEffect(() => {
    onChangeSidebarItems({
      explorer: true,
      profile: false,
      relevant: false,
    });
  }, []);

  return (
    <MainLayout
      title={`${user.name} (${user.username}) | Evlun`}
      description={user.biography}
      location="profile"
      name={user.name}
    >
      <ProfileHero user={user} />
      <FeedPosts url={`/user/${user._id}`} />
      {postModal && isAuthenticated === "authenticated" ? (
        <MoreOptionsModalMobile />
      ) : null}
    </MainLayout>
  );
};

export const getServerSideProps: GetServerSideProps = async ({ params }) => {
  const { username } = params as { username: string };
  const { user } = await getUserService(username);
  if (!user) {
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  }

  return {
    props: {
      user,
    },
  };
};

export default ProfilePage;
