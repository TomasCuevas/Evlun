import { useEffect } from 'react';
import { useInView } from 'react-intersection-observer';

//* components *//
import { Loading } from '../../components/Loading/Loading';
import { Main } from '../../components/Main/Main';
import { MoreFromPost } from '../../components/Post';

//* layouts *//
import {
  FeedPostsHome,
  Nav,
  NavSwitch,
  NavTopHome,
  NewPost,
} from '../../layouts';

//* provider *//
import { NavSwitchProvider } from '../../context/NavSwitchContext/NavSwitchContext';

//* hooks *//
import { usePostsStore } from '../../hooks/usePostsStore';

export const MainPage = () => {
  const { isLoading, isLoadingMore, startLoadingPosts, moreOptions } =
    usePostsStore();
  const { ref, inView } = useInView();

  useEffect(() => {
    if (inView && !isLoading && inView && !isLoadingMore) {
      startLoadingPosts();
    }
  }, [inView]);

  useEffect(() => {
    startLoadingPosts();
  }, []);

  return (
    <NavSwitchProvider>
      <Main>
        <NavSwitch />
        <NavTopHome />
        <NewPost />
        {isLoading ? <Loading /> : <FeedPostsHome />}
        {isLoadingMore && <Loading />}
        {moreOptions?.state && <MoreFromPost />}
        <div ref={ref} className="h-2 w-full"></div>
        <Nav />
      </Main>
    </NavSwitchProvider>
  );
};
