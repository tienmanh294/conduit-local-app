/* eslint-disable no-param-reassign */
/* eslint-disable arrow-parens */
import { createSlice } from '@reduxjs/toolkit';

const userSlice = createSlice({
  name: 'auth',
  initialState: { user: null, token: null },
  reducers: {
    setCredentials: (state, action) => {
      const { user, accessToken } = action.payload;
      state.user = user;
      state.token = accessToken;
    },
    logout: (state) => {
      state.user = null;
      state.token = null;
    },
    update: (state, action) => {
      state.user = action.payload;
    },
  },
});
export const userActions = userSlice.actions;
export default userSlice;

export const selectCurrentUser = state => state.auth.user;
export const selectCurrentToken = state => state.auth.token;
