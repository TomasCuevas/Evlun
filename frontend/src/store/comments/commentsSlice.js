import { createSlice } from '@reduxjs/toolkit';

export const commentsSlice = createSlice({
  name: 'comments',
  initialState: {
    comments: [],
    isCreating: false,
    isLoading: false,
    lt: undefined,
    moreOptions: {
      state: false,
    },
  },
  reducers: {
    onLoading: (state, { payload }) => {
      state.isLoading = true;
      state.lt = payload || undefined;
    },
    onCreating: (state) => {
      state.isCreating = true;
    },
    onSetComments: (state, { payload }) => {
      state.comments = payload;
      state.isLoading = false;
    },
    onAddNewComment: (state, { payload }) => {
      state.isCreating = false;
      const newComment = state.comments;
      newComment.unshift(payload);
      state.comments = newComment;
    },
    onSetMoreOptions: (state, { payload }) => {
      state.moreOptions = payload;
    },
  },
});

export const {
  onAddNewComment,
  onCreating,
  onLoading,
  onSetComments,
  onSetMoreOptions,
} = commentsSlice.actions;
