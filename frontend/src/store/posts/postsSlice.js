import { createSlice } from '@reduxjs/toolkit';

export const postsSlice = createSlice({
  name: 'posts',
  initialState: {
    isCreating: false,
    isLoading: false,
    isLoadingMore: false,
    lt: undefined,
    openPost: {},
    posts: [],
    savedPosts: [],
    savedPostsList: [],
    moreOptions: {
      state: false,
    },
  },
  reducers: {
    onLoading: (state, { payload }) => {
      state.lt = payload || state.lt;
      state.isLoading = true;
      state.isLoadingMore = false;
    },
    onLoadingMore: (state) => {
      state.isLoadingMore = true;
    },
    onCreating: (state) => {
      state.isCreating = true;
    },
    onSetPosts: (state, { payload }) => {
      const { posts, update = false } = payload;

      if (posts.length === 0) {
        state.isLoading = false;
        state.isLoadingMore = false;
        return;
      }

      if (update) {
        state.posts = [...state.posts, ...posts];
      } else {
        state.posts = posts;
      }

      state.isLoadingMore = false;
      state.isLoading = false;
    },
    onAddNewPost: (state, { payload }) => {
      state.posts = [payload, ...state.posts];
      state.isCreating = false;
    },
    onSetOpenPost: (state, { payload }) => {
      state.openPost = payload;
      state.isLoading = false;
    },
    onSetLikeToAPost: (state, { payload }) => {
      const { userId, postId, openPost } = payload;

      if (openPost) {
        if (state.openPost.likes.includes(userId)) {
          const openPostUpdate = state.openPost;
          const newArrayLike = openPostUpdate.likes.filter(
            (likeId) => likeId !== userId,
          );
          openPostUpdate.likes = newArrayLike.length > 0 ? newArrayLike : [];
          state.openPost = openPostUpdate;
        } else {
          const openPostUpdate = state.openPost;
          const newArrayLike = (openPostUpdate.likes = [
            ...openPostUpdate.likes,
            userId,
          ]);
          openPostUpdate.likes = newArrayLike;
          state.openPost = openPostUpdate;
        }
      }

      const postUpdate = state.posts;
      state.posts = postUpdate.map((post) => {
        if (post._id === postId) {
          if (post.likes.includes(userId)) {
            const newArrayLike = post.likes.filter(
              (likeId) => likeId !== userId,
            );
            post.likes = newArrayLike.length > 0 ? newArrayLike : [];
          } else {
            post.likes = [...post.likes, userId];
          }

          return post;
        }

        return post;
      });

      const postSavedUpdate = state.savedPosts;
      state.savedPosts = postSavedUpdate.map((post) => {
        if (post._id === postId) {
          if (post.likes.includes(userId)) {
            const newArrayLike = post.likes.filter(
              (likeId) => likeId !== userId,
            );
            post.likes = newArrayLike.length > 0 ? newArrayLike : [];
          } else {
            post.likes = [...post.likes, userId];
          }

          return post;
        }

        return post;
      });
    },
    onSetSavedPosts: (state, { payload }) => {
      const { posts, update = false } = payload;

      if (posts.length === 0) {
        state.isLoading = false;
        state.isLoadingMore = false;
        return;
      }

      if (update) {
        state.savedPosts = [...state.savedPosts, ...posts];
      } else {
        state.savedPosts = posts;
      }

      state.isLoadingMore = false;
      state.isLoading = false;
    },
    onClearSavedPosts: (state) => {
      state.savedPosts = [];
    },
    onRemoveSavedPosts: (state, { payload }) => {
      state.savedPosts = state.savedPosts.filter(
        (postId) => postId._id !== payload,
      );
    },
    onSetSavedPostList: (state, { payload }) => {
      state.savedPostsList = payload;
    },
    onSetMoreOptions: (state, { payload }) => {
      state.moreOptions = payload;
    },
  },
});

export const {
  onAddNewPost,
  onClearSavedPosts,
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
} = postsSlice.actions;
