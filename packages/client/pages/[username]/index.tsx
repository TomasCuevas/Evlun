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

//* hook *//
import { useUser } from "@/hooks";

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
  const { onSetNavbarData } = useNavbarTopStore();
  const { user: userByHook } = useUser(user.username);

  const router = useRouter();

  useEffect(() => {
    onChangeSidebarItems({
      explorer: true,
      profile: false,
      relevant: false,
    });
    onSetNavbarData({ profileName: user.name, profileUsername: user.username });
  }, [router.asPath]);

  return (
    <MainLayout
      title={`${user.name} (${user.username}) | Evlun`}
      description={user.biography}
      withoutAuth
    >
      <ProfileHero user={userByHook ? userByHook : user} />
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
