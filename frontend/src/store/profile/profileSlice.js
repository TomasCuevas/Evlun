import { createSlice } from '@reduxjs/toolkit';

export const profileSlice = createSlice({
  name: 'profile',
  initialState: {
    errorMessage: undefined,
    isLoading: false,
    isLoadingMore: false,
    lt: undefined,
    posts: [],
    status: undefined,
    user: {},
  },
  reducers: {
    onLoading: (state, { payload }) => {
      state.isLoading = true;
      state.isLoadingMore = false;
      state.lt = payload;
    },
    onLoadingMore: (state) => {
      state.isLoadingMore = true;
    },
    onStopLoading: (state, { payload }) => {
      const { error, status } = payload;

      state.errorMessage = error || undefined;
      state.status = status || undefined;
      state.isLoading = false;
    },
    onSetUser: (state, { payload }) => {
      state.user = payload;
    },
    onSetPosts: (state, { payload }) => {
      const { posts, update = false } = payload;

      if (update) {
        state.posts = [...state.posts, ...posts];
      } else {
        state.posts = posts;
      }

      state.isLoadingMore = false;
      state.isLoading = false;
    },
    onSetLikeToAPost: (state, { payload }) => {
      const { userId, postId } = payload;

      const postUpdate = state.posts;
      state.posts = postUpdate.map((post) => {
        if (post._id === postId) {
          if (post.likes.includes(userId)) {
            post.likes =
              post.likes.filter((likeId) => likeId !== userId).length > 0
                ? post.likes.filter((likeId) => likeId !== userId)
                : [];
          } else {
            post.likes = [...post.likes, userId];
          }
          return post;
        }

        return post;
      });
    },
    updateFollowersList: (state, { payload }) => {
      const user = state.user;
      user.followers = payload;

      state.user = user;
    },
    onClearProfile: (state) => {
      state.errorMessage = undefined;
      state.isLoading = false;
      state.isLoadingMore = false;
      state.lt = undefined;
      state.posts = [];
      state.status = undefined;
      state.user = {};
    },
  },
});

export const {
  onLoading,
  onLoadingMore,
  onSetLikeToAPost,
  onSetPosts,
  onSetUser,
  onStopLoading,
  updateFollowersList,
  onClearProfile,
} = profileSlice.actions;
