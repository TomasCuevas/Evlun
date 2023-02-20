import { useContext, useEffect } from "react";
import { NextPage, GetServerSideProps } from "next";

//* service *//
import { getUniquePostService } from "../../services";

//* components *//
import {
  FeedPosts,
  FullPost,
  MoreOptionsModalMobile,
  NewPost,
  Post,
} from "../../components/post";

//* layout *//
import { MainLayout } from "../../components/layouts";

//* context *//
import { AuthContext, RightSidebarContext, UIContext } from "../../context";

//* interfaces *//
import { IPost } from "../../interfaces/post";

interface Props {
  post: IPost;
  postRef?: IPost;
}

const PostPage: NextPage<Props> = ({ post, postRef }) => {
  const { isAuthenticated } = useContext(AuthContext);
  const { postModal } = useContext(UIContext);
  const { onChangeSidebarItems, setRelevantPersons } =
    useContext(RightSidebarContext);

  useEffect(() => {
    onChangeSidebarItems({
      explorer: true,
      profile: false,
      relevant: true,
    });
    setRelevantPersons(
      postRef ? [postRef.added_by, post.added_by] : [post.added_by]
    );
  }, [post]);

  return (
    <MainLayout
      title={`${post.added_by.name} en Evlun: "${post.text}"`}
      description={post.content}
      location="post"
    >
      {postRef ? <Post post={postRef} fromAnswer={true} /> : null}
      <FullPost post={post} postRef={postRef ? true : false} />
      {isAuthenticated === "authenticated" ? (
        <NewPost postRef={post._id} />
      ) : null}
      <FeedPosts url={`/answers/${post._id}`} />
      {postModal && isAuthenticated === "authenticated" ? (
        <MoreOptionsModalMobile />
      ) : null}
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
