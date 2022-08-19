import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

//* slices *//
import {
  onAddNewPost,
  onCreating,
  onLoading,
  onLoadingMore,
  onRemoveSavedPosts,
  onSetLikeToAPost,
  onSetMoreOptions,
  onSetOpenPost,
  onSetPosts,
  onSetSavedPostList,
  onSetSavedPosts,
  onClearSavedPosts,
} from '../store/posts/postsSlice';
import {
  onSetPosts as onSetPostsProfile,
  onSetLikeToAPost as onSetLikeToAPostProfile,
} from '../store/profile/profileSlice';

//* apis *//
import { postApi } from '../apis';

//* hooks *//
import { useAuthStore } from './useAuthStore';

export const usePostsStore = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const {
    isCreating,
    isLoading,
    isLoadingMore,
    lt,
    moreOptions,
    openPost,
    posts,
    savedPosts,
    savedPostsList,
  } = useSelector((state) => state.posts);
  const { posts: postsProfile } = useSelector((state) => state.profile);

  const [errorMessage, setErrorMessage] = useState('');
  const [previousLoading, setPreviousLoading] = useState(false);
  const [scroll, setScroll] = useState(window.onscroll);
  const { user } = useAuthStore();

  const startLoadingPosts = async (reload) => {
    try {
      const newLt = new Date().getTime();

      if (lt && !reload) {
        dispatch(onLoadingMore());
        const { data } = await postApi.get(
          `/all?lt=${lt}&skip=${posts.length}`,
        );
        dispatch(onSetPosts({ posts: data.posts, update: true }));
      } else {
        dispatch(onLoading(newLt));
        const { data } = await postApi.get(`/all?lt=${newLt}`);
        dispatch(onSetPosts({ posts: data.posts, update: false }));
      }
    } catch (error) {
      console.error(error);
      setErrorMessage(error.response.data.msg);
    }
  };

  const startLoadingSavedPosts = async (first) => {
    try {
      if (first) {
        dispatch(onLoading());

        const { data } = await postApi.get(`/saved`);
        dispatch(onSetSavedPosts({ posts: data.posts, update: false }));
      } else {
        dispatch(onLoadingMore());
        const { data } = await postApi.get(`/saved?skip=${savedPosts.length}`);
        dispatch(onSetSavedPosts({ posts: data.posts, update: true }));
      }
    } catch (error) {
      console.error(error);
      setErrorMessage(error.response.data.msg);
    }
  };

  const startLoadingSavedPostsList = async () => {
    try {
      if (previousLoading) return;
      setPreviousLoading(true);

      const { data } = await postApi.get('/savedlist');
      dispatch(onSetSavedPostList(data.savedPostsList));
    } catch (error) {
      console.error(error);
    }
  };

  const startLoadingOpenPost = async (id) => {
    try {
      dispatch(onLoading());
      for (const post of posts) {
        if (post._id === id) {
          return dispatch(onSetOpenPost(post));
        }
      }

      const { data } = await postApi.get(`?id=${id}`);
      dispatch(onSetOpenPost(data.post));
    } catch (error) {
      console.error(error);
      setErrorMessage(error.response.data.msg);
    }
  };

  const startCreateNewPosts = async (content) => {
    try {
      dispatch(onCreating());
      const { data } = await postApi.post('/create', { content });
      dispatch(onAddNewPost(data.post));
    } catch (error) {
      console.error(error);
      setErrorMessage(error.response.data.msg);
    }
  };

  const startLikeToAPost = async (postId, openPost = false) => {
    try {
      if (openPost) {
        dispatch(onSetLikeToAPost({ userId: user._id, postId, openPost }));
      } else {
        dispatch(
          onSetLikeToAPost({ userId: user._id, postId, openPost: false }),
        );
        dispatch(onSetLikeToAPostProfile({ userId: user._id, postId }));
      }

      await postApi.post(`/like?id=${postId}`);
    } catch (error) {
      console.error(error);
    }
  };

  const setMore = async (addedBy, postId) => {
    const scrollNumber = window.scrollY;
    window.onscroll = () => {
      window.scroll(0, scrollNumber);
    };
    dispatch(onSetMoreOptions({ addedBy, postId, state: true }));
  };

  const disableMore = async () => {
    window.onscroll = scroll;
    dispatch(onSetMoreOptions({ state: false }));
  };

  const startSavePost = async (postId) => {
    try {
      await postApi.post(`/save?id=${postId}`);

      const { data } = await postApi.get('/savedlist');
      dispatch(onSetSavedPostList(data.savedPostsList));
    } catch (error) {
      console.error(error);
      setErrorMessage(error.response.data.msg);
    }
  };

  const startRemoveSavePost = async (postId) => {
    try {
      await postApi.post(`/save?id=${postId}`);

      const { data } = await postApi.get('/savedlist');
      dispatch(onRemoveSavedPosts(postId));
      dispatch(onSetSavedPostList(data.savedPostsList));
    } catch (error) {
      console.error(error);
      setErrorMessage(error.response.data.msg);
    }
  };

  const startReportPost = async (postId) => {
    try {
      await postApi.post(`/report?id=${postId}`);
    } catch (error) {
      console.error(error);
      setErrorMessage(error.response.data.msg);
    }
  };

  const startDeletePost = async (postId) => {
    try {
      await postApi.delete(`/delete?id=${postId}`);

      const updatedPosts = posts.filter((post) => post._id !== postId);
      const updatedPostsProfile = postsProfile.filter(
        (post) => post._id !== postId,
      );
      dispatch(onSetPosts({ posts: updatedPosts, update: false }));
      dispatch(
        onSetPostsProfile({ posts: updatedPostsProfile, update: false }),
      );
    } catch (error) {
      console.error(error);
      setErrorMessage(error.response.data.msg);
    }
  };

  const startDeleteOpenPost = async (postId) => {
    try {
      await postApi.delete(`/delete?id=${postId}`);
      navigate('/', { replace: true });
    } catch (error) {
      console.error(error);
      setErrorMessage(error.response.data.msg);
    }
  };

  return {
    // properties
    errorMessage,
    isCreating,
    isLoading,
    isLoadingMore,
    moreOptions,
    openPost,
    posts,
    previousLoading,
    savedPosts,
    savedPostsList,

    // methods
    disableMore,
    onClearSavedPosts,
    setMore,
    startCreateNewPosts,
    startDeleteOpenPost,
    startDeletePost,
    startLikeToAPost,
    startLoadingOpenPost,
    startLoadingPosts,
    startLoadingSavedPosts,
    startLoadingSavedPostsList,
    startRemoveSavePost,
    startReportPost,
    startSavePost,
  };
};
