/* eslint-disable no-underscore-dangle */
/* eslint-disable no-unused-vars */
import { apiSlice } from './apiSlice';

export const commentsApiSlice = apiSlice.injectEndpoints({
  endpoints: builder => ({
    getComments: builder.query({
      query: id => `/articles/${id}/comments`,
      keepUnusedDataFor: 60 * 5,
      providesTags: (result, error, arg) => [
        { type: 'Comments', id: 'LIST' },
        ...result.map(comment => ({ type: 'Comments', ...comment._id })),
      ],
    }),
    updateComment: builder.mutation({
      query: data => ({
        url: `/articles/${data.slug}/comments`,
        method: 'PATCH',
        body: { ...data },
      }),
      invalidatesTags: [{ type: 'Comments', id: 'LIST' }],
    }),
    deleteComment: builder.mutation({
      query: data => ({
        url: `/articles/${data.slug}/comments/${data.id}`,
        method: 'DELETE',
        body: {},
      }),
      invalidatesTags: [{ type: 'Comments', id: 'LIST' }],
    }),
    addComment: builder.mutation({
      query: data => ({
        url: `/articles/${data.slug}/comments`,
        method: 'POST',
        body: { ...data },
      }),
      invalidatesTags: [{ type: 'Comments', id: 'LIST' }],
    }),

  }),
});
export const {
  useAddCommentMutation,
  useUpdateCommentMutation,
  useDeleteCommentMutation,
  useGetCommentsQuery,
} = commentsApiSlice;
