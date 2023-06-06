import { useEffect } from "react";
import { GetStaticProps, NextPage, GetStaticPaths } from "next";
import { useRouter } from "next/router";

//* components
import { ConnectionsFeed } from "@/components/connections";
import { Loader } from "@/components/ui";

//* layout *//
import { MainLayout } from "@/layouts";

//* service *//
import { getUserService } from "@/services";

//* hook *//
import { useFollowing } from "@/hooks";

//* stores *//
import { useNavbarTopStore, useRightSidebarStore } from "@/store";

//* interfaces *//
import { IUser } from "@/interfaces";

interface Props {
  user: IUser;
}

const FollowingPage: NextPage<Props> = ({ user }) => {
  const { onChangeSidebarItems } = useRightSidebarStore();
  const { onSetLocation, onSetNavbarData } = useNavbarTopStore();
  const { following, followingQuery } = useFollowing(user._id);
  const router = useRouter();

  useEffect(() => {
    onChangeSidebarItems({
      explorer: true,
      profile: false,
      relevant: false,
    });
    onSetLocation("profile");
    onSetNavbarData({
      profileName: user.name,
      profileUsername: user.username,
      connections: true,
    });
  }, [router.asPath]);

  return (
    <MainLayout
      title={`Personas que sigue ${user.name} (${user.username}) | Evlun`}
    >
      {followingQuery.isLoading && <Loader />}
      <ConnectionsFeed users={following} />
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

export default FollowingPage;
