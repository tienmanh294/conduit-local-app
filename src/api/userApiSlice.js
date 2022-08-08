import { apiSlice } from './apiSlice';

export const usersApiSlice = apiSlice.injectEndpoints({
  endpoints: builder => ({
    getUser: builder.query({
      query: () => '/users/me',
      providesTags: ['Me'],
      keepUnusedDataFor: 60 * 5,
    }),
    getUserByName: builder.query({
      query: id => `/users/${id}`,
      providesTags: ['User'],
      keepUnusedDataFor: 60 * 5,
    }),
    logoutUser: builder.mutation({
      query: () => ({
        url: '/users/logoutAll',
        method: 'POST',
        body: {},
      }),
    }),
    updateUser: builder.mutation({
      query: data => ({
        url: '/users/me',
        method: 'PATCH',
        body: { ...data },
      }),
      invalidatesTags: ['Me'],
    }),
    signUpUser: builder.mutation({
      query: data => ({
        url: '/users',
        method: 'POST',
        body: { ...data },
      }),
    }),
    followUser: builder.mutation({
      query: username => ({
        url: `/users/${username}/follow`,
        method: 'POST',
        body: {},
      }),
      invalidatesTags: [{ type: 'Follows' }, { type: 'User' }],
    }),
    uploadImage: builder.mutation({
      query: data => ({
        url: '/users/me/avatar',
        method: 'POST',
        body: data,
      }),
      invalidatesTags: [{ type: 'Follows' }, { type: 'User' }, { type: 'Articles', id: 'LIST' }],
    }),
  }),
});

export const {
  useGetUserQuery,
  useLogoutUserMutation,
  useUpdateUserMutation,
  useSignUpUserMutation,
  useGetUserByNameQuery,
  useFollowUserMutation,
  useUploadImageMutation,
} = usersApiSlice;
