import { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useInView } from 'react-intersection-observer';

//* components *//
import { Loading } from '../../components/Loading/Loading';
import { Main } from '../../components/Main/Main';
import { MoreFromPost } from '../../components/Post';

//* layouts *//
import {
  FeedPostsProfile,
  Nav,
  NavTopProfile,
  ProfileHero,
} from '../../layouts';

//* hooks *//
import { usePostsStore, useProfileStore } from '../../hooks';

export const ProfilePage = () => {
  const { isLoading, isLoadingMore, startLoading, status, startClearProfile } =
    useProfileStore();
  const { moreOptions } = usePostsStore();
  const { username } = useParams();
  const { ref, inView } = useInView();
  const navigate = useNavigate();

  useEffect(() => {
    if (inView && !isLoading && inView && !isLoadingMore) {
      startLoading(username, false);
    }
  }, [inView]);

  useEffect(() => {
    startLoading(username, true);
  }, [username]);

  useEffect(() => {
    if (status === 410 || status === 400) navigate('/', { replace: true });

    return startClearProfile();
  }, [status]);

  return (
    <Main>
      <NavTopProfile />
      <ProfileHero />
      {isLoading ? <Loading /> : <FeedPostsProfile />}
      {isLoadingMore && <Loading />}
      {moreOptions?.state && <MoreFromPost />}
      <div ref={ref} className="h-2 w-full"></div>
      <Nav />
    </Main>
  );
};
