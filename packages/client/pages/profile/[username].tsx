import { useEffect } from "react";
import { GetServerSideProps, NextPage } from "next";

//* service *//
import { getUserService } from "@/services";

//* layout *//
import { MainLayout } from "@/layouts";

//* components *//
import { FeedPosts, MoreOptionsModalMobile } from "@/components/post";
import { ProfileHero } from "@/components/profile";

//* stores *//
import {
  useNavbarTopStore,
  usePostsStore,
  useRightSidebarStore,
} from "@/store";

//* interfaces *//
import { IUser } from "@/interfaces";

interface Props {
  user: IUser;
}

const ProfilePage: NextPage<Props> = ({ user }) => {
  const { onChangeSidebarItems } = useRightSidebarStore();
  const { postModal } = usePostsStore();
  const { onSetLocation, onSetNavbarData } = useNavbarTopStore();

  useEffect(() => {
    onChangeSidebarItems({
      explorer: true,
      profile: false,
      relevant: false,
    });
    onSetLocation("profile");
    onSetNavbarData({ profileName: user.name });
  }, []);

  return (
    <MainLayout
      title={`${user.name} (${user.username}) | Evlun`}
      description={user.biography}
      withoutAuth
    >
      <ProfileHero user={user} />
      <FeedPosts url={`/user/${user._id}`} />
      {postModal ? <MoreOptionsModalMobile /> : null}
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
