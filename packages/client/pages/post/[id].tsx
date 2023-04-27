import { useEffect } from "react";
import { NextPage, GetServerSideProps } from "next";

//* service *//
import { getUniquePostService } from "@/services";

//* components *//
import {
  FeedPosts,
  FullPost,
  MoreOptionsModalMobile,
  NewPost,
  Post,
} from "@/components/post";

//* layout *//
import { MainLayout } from "@/layouts";

//* stores *//
import {
  useAuthStore,
  useNavbarTopStore,
  usePostsStore,
  useRightSidebarStore,
} from "@/store";

//* interfaces *//
import { IPost } from "@/interfaces";

interface Props {
  post: IPost;
  postRef?: IPost;
}

const PostPage: NextPage<Props> = ({ post, postRef }) => {
  const { isAuthenticated } = useAuthStore();
  const { onChangeSidebarItems, setRelevantPersons } = useRightSidebarStore();
  const { postModal } = usePostsStore();
  const { onSetLocation } = useNavbarTopStore();

  useEffect(() => {
    onChangeSidebarItems({
      explorer: true,
      profile: false,
      relevant: true,
    });
    setRelevantPersons(
      postRef && postRef.added_by.username !== post.added_by.username
        ? [postRef.added_by, post.added_by]
        : [post.added_by]
    );
    onSetLocation("post");
  }, [post]);

  return (
    <MainLayout
      title={`${post.added_by.name} en Evlun: "${post.text}"`}
      description={post.content}
      withoutAuth
    >
      {postRef ? <Post post={postRef} fromAnswer={true} /> : null}
      <FullPost post={post} postRef={postRef ? true : false} />
      {isAuthenticated === "authenticated" && <NewPost postRef={post._id} />}
      <FeedPosts url={`/answers/${post._id}`} />
      {postModal ? <MoreOptionsModalMobile /> : null}
    </MainLayout>
  );
};

export const getServerSideProps: GetServerSideProps = async ({ params }) => {
  const { id } = params as { id: string };
  const result = await getUniquePostService(id);

  if (!result.ok) {
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  }

  if (result.postRef) {
    return {
      props: {
        post: result.post,
        postRef: result.postRef,
      },
    };
  }

  return {
    props: {
      post: result.post,
    },
  };
};

export default PostPage;
