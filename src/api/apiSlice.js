/* eslint-disable import/prefer-default-export */
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { userActions } from '../store/user-slice';

const baseQuery = fetchBaseQuery({
  baseUrl: process.env.REACT_APP_BASE_URL,
  credentials: 'include',
  prepareHeaders: (headers, { getState }) => {
    const { token } = getState().auth;
    if (token) {
      headers.set('Authorization', `Bearer ${token}`);
    }
    return headers;
  },
});

const baseQueryWithReauth = async (args, api, extraOptions) => {
  let result = await baseQuery(args, api, extraOptions);
  if (result?.error?.status === 401) {
    // console.log('sending refresh token');
    // send refresh token to get new access token
    const refreshResult = await baseQuery('/users/refresh', api, extraOptions);

    if (refreshResult?.data) {
      const { user } = refreshResult.data;
      // console.log('this is accesstoken response');
      // console.log(refreshResult.data.accessToken);
      const { accessToken } = refreshResult.data;
      // store the new token
      api.dispatch(userActions.setCredentials({ user, accessToken }));

      // retry the original query with new access token
      result = await baseQuery(args, api, extraOptions);
    } else {
      api.dispatch(userActions.logout());
    }
  }
  return result;
};

export const apiSlice = createApi({
  baseQuery: baseQueryWithReauth,
  tagTypes: ['Favorites', 'Comments', 'User', 'Articles', 'Article', 'Follows', 'Me', 'Tag'],
  endpoints: () => ({}),
});
