import { createSlice } from '@reduxjs/toolkit';

export const authSlice = createSlice({
  name: 'auth',
  initialState: {
    errorMessage: undefined,
    status: 'checking',
    statusCode: undefined,
    user: {},
  },
  reducers: {
    onLogin: (state, { payload }) => {
      state.status = 'authenticated';
      state.user = payload;
    },
    onLogout: (state, { payload }) => {
      const { statusCode, error } = payload;

      state.errorMessage = error;
      state.status = 'not-authenticated';
      state.statusCode = statusCode;
      state.user = {};
    },
    onCheckingCredentials: (state) => {
      state.status = 'checking';
    },
    updateFollowingsList: (state, { payload }) => {
      const user = state.user;
      user.followings = payload;

      state.user = user;
    },
    onSetErrorAndStatus: (state, { payload }) => {
      const { error, statusCode } = payload;

      state.errorMessage = error;
      state.statusCode = statusCode;
    },
    onClearErrorAndStatusCode: (state) => {
      state.errorMessage = undefined;
      state.statusCode = undefined;
    },
  },
});

export const {
  onCheckingCredentials,
  onClearErrorAndStatusCode,
  onLogin,
  onLogout,
  onSetErrorAndStatus,
  updateFollowingsList,
} = authSlice.actions;
