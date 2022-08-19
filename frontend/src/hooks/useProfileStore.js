import { useSelector, useDispatch } from 'react-redux';

//* slices *//
import {
  onClearProfile,
  onLoading,
  onLoadingMore,
  onSetPosts,
  onSetUser,
  onStopLoading,
  updateFollowersList,
} from '../store/profile/profileSlice';
import { updateFollowingsList } from '../store/auth/authSlice';

//* apis *//
import { postApi, userApi } from '../apis';

export const useProfileStore = () => {
  const { isLoading, isLoadingMore, user, posts, lt, errorMessage, status } =
    useSelector((state) => state.profile);
  const dispatch = useDispatch();

  const startLoading = async (username, reload) => {
    try {
      const newLt = new Date().getTime();

      if (lt && !reload) {
        dispatch(onLoadingMore());

        const { data: postData } = await postApi.get(
          `/user?id=${user._id}&lt=${lt}&skip=${posts.length}`,
        );
        dispatch(onSetPosts({ posts: postData.posts, update: true }));
      } else {
        dispatch(onLoading(newLt));

        const { data: userData } = await userApi.get(`?username=${username}`);
        dispatch(onSetUser(userData.user));

        const { data: postData } = await postApi.get(
          `/user?id=${userData.user._id}&lt=${newLt}`,
        );
        dispatch(onSetPosts({ posts: postData.posts, update: false }));
      }
    } catch (error) {
      console.error(error);
      dispatch(
        onStopLoading({
          error: error.response.data.msg,
          status: error.response.status,
        }),
      );
    }
  };

  const startFollowing = async () => {
    try {
      const { data } = await userApi.post(`/follow?id=${user._id}`);

      dispatch(updateFollowersList(data.updateProfileUser));
      dispatch(updateFollowingsList(data.updateAuthUser));
    } catch (error) {
      console.error(error);
      dispatch(onStopLoading(error.response.data.msg));
    }
  };

  const startUnfollowing = async () => {
    try {
      const { data } = await userApi.post(`/unfollow?id=${user._id}`);

      dispatch(updateFollowersList(data.updateProfileUser));
      dispatch(updateFollowingsList(data.updateAuthUser));
    } catch (error) {
      console.error(error);
      dispatch(onStopLoading(error.response.data.msg));
    }
  };

  const startClearProfile = () => {
    dispatch(onClearProfile());
  };

  return {
    // properties
    ...user,
    errorMessage,
    isLoading,
    isLoadingMore,
    posts,
    status,
    user,

    // methods
    startClearProfile,
    startFollowing,
    startLoading,
    startUnfollowing,
  };
};
