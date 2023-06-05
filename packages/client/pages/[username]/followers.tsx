import { useEffect } from "react";
import { GetStaticProps, NextPage, GetStaticPaths } from "next";
import { useRouter } from "next/router";

//* components *//
import { ConnectionsFeed } from "@/components/connections";

//* layout *//
import { MainLayout } from "@/layouts";

//* service *//
import { getUserService } from "@/services";

//* hooks *//
import { useFollowers } from "@/hooks";

//* stores *//
import { useNavbarTopStore, useRightSidebarStore, useUserStore } from "@/store";

//* interfaces *//
import { IUser } from "@/interfaces";

interface Props {
  user: IUser;
}

const FollowersPage: NextPage<Props> = ({ user }) => {
  const { onChangeSidebarItems } = useRightSidebarStore();
  const { onSetLocation, onSetNavbarData } = useNavbarTopStore();
  const { getUser } = useUserStore();
  const { followers } = useFollowers(user._id);
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
    getUser(user.username);
  }, [router.asPath]);

  return (
    <MainLayout
      title={`Personas que siguen a ${user.name} (${user.username}) | Evlun`}
    >
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