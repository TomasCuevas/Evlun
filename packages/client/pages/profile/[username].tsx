import { useEffect } from "react";
import { GetStaticPaths, GetStaticProps, NextPage } from "next";
import { useRouter } from "next/router";

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
  useUserStore,
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
  const { userUpdated, getUser } = useUserStore();
  const { asPath } = useRouter();

  useEffect(() => {
    onChangeSidebarItems({
      explorer: true,
      profile: false,
      relevant: false,
    });
    onSetLocation("profile");
    onSetNavbarData({ profileName: user.name });
    getUser(user.username);
  }, [asPath]);

  return (
    <MainLayout
      title={`${user.name} (${user.username}) | Evlun`}
      description={user.biography}
      withoutAuth
    >
      <ProfileHero user={userUpdated || user} />
      <FeedPosts url={`/user/${user._id}`} />
      {postModal ? <MoreOptionsModalMobile /> : null}
    </MainLayout>
  );
};

export const getStaticPaths: GetStaticPaths = async () => {
  return {
    paths: [],
    fallback: "blocking",
  };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
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
    revalidate: 172800,
  };
};

export default ProfilePage;
