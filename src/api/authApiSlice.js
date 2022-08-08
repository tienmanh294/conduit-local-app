import { apiSlice } from './apiSlice';

export const authApiSlice = apiSlice.injectEndpoints({
  endpoints: builder => ({
    login: builder.mutation({
      query: credentials => ({
        url: '/users/login',
        method: 'POST',
        body: { ...credentials },
      }),
      invalidatesTags: ['Follows'],
    }),
  }),
});
export const { useLoginMutation } = authApiSlice;
