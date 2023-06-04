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
  const { getUser, userUpdated } = useUserStore();
  const router = useRouter();

  useEffect(() => {
    onChangeSidebarItems({
      explorer: true,
      profile: false,
      relevant: false,
    });
    onSetLocation("profile");
    onSetNavbarData({ profileName: user.name, profileUsername: user.username });
    getUser(user.username);
  }, [router.asPath]);

  return (
    <MainLayout
      title={`${user.name} (${user.username}) | Evlun`}
      description={user.biography}
      withoutAuth
    >
      <ProfileHero user={userUpdated ? userUpdated : user} />
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

  try {
    const user = await getUserService(username);

    return {
      props: {
        user,
      },
      revalidate: 172800,
    };
  } catch (error) {
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  }
};

export default ProfilePage;
