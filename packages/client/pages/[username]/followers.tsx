import { useEffect } from "react";
import { GetStaticProps, NextPage, GetStaticPaths } from "next";
import { useRouter } from "next/router";

//* components *//
import { ConnectionsFeed } from "@/components/connections";
import { Loader } from "@/components/ui";

//* layout *//
import { MainLayout } from "@/layouts";

//* service *//
import { getUserService } from "@/services";

//* hooks *//
import { useFollowers } from "@/hooks";

//* stores *//
import { useNavbarTopStore, useRightSidebarStore } from "@/store";

//* interfaces *//
import { IUser } from "@/interfaces";

interface Props {
  user: IUser;
}

const FollowersPage: NextPage<Props> = ({ user }) => {
  const { onChangeSidebarItems } = useRightSidebarStore();
  const { onSetNavbarData } = useNavbarTopStore();
  const { followers, followersQuery } = useFollowers(user._id);
  const router = useRouter();

  useEffect(() => {
    onChangeSidebarItems({
      explorer: true,
      profile: false,
      relevant: false,
    });
    onSetNavbarData({
      profileName: user.name,
      profileUsername: user.username,
    });
  }, [router.asPath]);

  return (
    <MainLayout
      title={`Personas que siguen a ${user.name} (${user.username}) | Evlun`}
    >
      {followersQuery.isLoading && <Loader />}
      <ConnectionsFeed users={followers} />
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

export default FollowersPage;
