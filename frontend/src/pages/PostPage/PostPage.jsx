import { useEffect } from 'react';
import { useParams } from 'react-router-dom';

//* components *//
import { Main } from '../../components/Main/Main';
import { MoreFromOpenPost } from '../../components/OpenPost';
import { MoreFromComment } from '../../components/Comment';

//* layouts *//
import {
  Nav,
  NavTopPost,
  NewComment,
  OpenPost,
  FeedComments,
} from '../../layouts';

//* pages *//
import { LoadingPage } from '../LoadingPage/LoadingPage';

//* hooks *//
import { useCommentsStore, usePostsStore } from '../../hooks';

export const PostPage = () => {
  const { isLoading, startLoadingOpenPost, moreOptions } = usePostsStore();
  const { startLoadingComments, moreOptions: moreOptionsComments } =
    useCommentsStore();
  const { id } = useParams();

  useEffect(() => {
    startLoadingOpenPost(id);
    startLoadingComments(id);
  }, [id]);

  if (isLoading) return <LoadingPage />;

  return (
    <>
      <Main>
        <NavTopPost />
        <OpenPost />
        <NewComment />
        <FeedComments />
        {moreOptions?.state && <MoreFromOpenPost />}
        {moreOptionsComments?.state && <MoreFromComment />}
        <Nav />
      </Main>
    </>
  );
};
