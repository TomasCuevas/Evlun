import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

//* slices *//
import {
  onAddNewComment,
  onCreating,
  onLoading,
  onSetComments,
  onSetMoreOptions,
} from '../store/comments/commentsSlice';

//* apis *//
import { commentApi } from '../apis';

export const useCommentsStore = () => {
  const { comments, isCreating, isLoading, moreOptions } = useSelector(
    (state) => state.comments,
  );
  const dispatch = useDispatch();
  const [errorMessage, setErrorMessage] = useState('');
  const [scroll, setScroll] = useState(window.scroll);

  const startLoadingComments = async (postId) => {
    try {
      const newLt = new Date().getTime();
      dispatch(onLoading(newLt));

      const { data } = await commentApi.get(`?id=${postId}&lt=${newLt}`);
      dispatch(onSetComments(data.comments));
    } catch (error) {
      console.error(error);
      setErrorMessage(error.response.data.msg);
    }
  };

  const startCreateNewComment = async (content, postId) => {
    try {
      dispatch(onCreating());
      const { data } = await commentApi.post(`/create?id=${postId}`, {
        content,
      });
      dispatch(onAddNewComment(data.comment));
    } catch (error) {
      console.error(error);
      setErrorMessage(error.response.data.msg);
    }
  };

  const startLikeToAComment = async (commentId) => {
    try {
      await commentApi.post(`/like?id=${commentId}`);
    } catch (error) {
      console.error(error);
    }
  };

  const setMore = async (addedBy, commentId) => {
    const scrollNumber = window.scrollY;
    window.onscroll = () => {
      window.scroll(0, scrollNumber);
    };
    dispatch(onSetMoreOptions({ addedBy, commentId, state: true }));
  };

  const disableMore = async () => {
    window.onscroll = scroll;
    dispatch(onSetMoreOptions({ state: false }));
  };

  const startReportComment = async (commentId) => {
    try {
      await commentApi.post(`/report?id=${commentId}`);
    } catch (error) {
      console.error(error);
      setErrorMessage(error.response.data.msg);
    }
  };

  const startDeleteComment = async (commentId) => {
    try {
      await commentApi.delete(`/delete?id=${commentId}`);

      const updateComments = comments.filter(
        (comment) => comment._id !== commentId,
      );
      dispatch(onSetComments(updateComments));
    } catch (error) {
      console.error(error);
      setErrorMessage(error.response.data.msg);
    }
  };

  return {
    // properties
    comments,
    errorMessage,
    isCreating,
    isLoading,
    moreOptions,

    // methods
    disableMore,
    setMore,
    startCreateNewComment,
    startDeleteComment,
    startLikeToAComment,
    startLoadingComments,
    startReportComment,
  };
};
