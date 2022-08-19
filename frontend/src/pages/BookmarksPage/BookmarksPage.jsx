import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useInView } from 'react-intersection-observer';

//* components *//
import { Loading } from '../../components/Loading/Loading';
import { Main } from '../../components/Main/Main';
import { MoreFromPost } from '../../components/Post';

//* layouts *//
import { Nav, NavTopSettings, FeedSavedPosts } from '../../layouts';

//* hooks *//
import { usePostsStore } from '../../hooks';

//* slices *//
import { onClearSavedPosts } from '../../store/posts/postsSlice';

export const BookmarksPage = () => {
  const { startLoadingSavedPosts, isLoading, moreOptions, isLoadingMore } =
    usePostsStore();
  const dispatch = useDispatch();
  const { ref, inView } = useInView();

  useEffect(() => {
    if (inView && !isLoading && inView && !isLoadingMore) {
      startLoadingSavedPosts(false);
    }
  }, [inView]);

  useEffect(() => {
    dispatch(onClearSavedPosts());
    startLoadingSavedPosts(true);
  }, []);

  return (
    <>
      <Main>
        <NavTopSettings navText="Guardados" />
        <div>
          {isLoading ? <Loading /> : <FeedSavedPosts />}
          {isLoadingMore && <Loading />}
        </div>
        {moreOptions?.state && <MoreFromPost />}
        <div ref={ref} className="h-2 w-full"></div>
        <Nav />
      </Main>
    </>
  );
};
