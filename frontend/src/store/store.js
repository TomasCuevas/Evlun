import { configureStore } from '@reduxjs/toolkit';

//* slices *//
import { authSlice } from './auth/authSlice';
import { postsSlice } from './posts/postsSlice';
import { profileSlice } from './profile/profileSlice';
import { commentsSlice } from './comments/commentsSlice';

export const store = configureStore({
  reducer: {
    auth: authSlice.reducer,
    comments: commentsSlice.reducer,
    posts: postsSlice.reducer,
    profile: profileSlice.reducer,
  },
});
