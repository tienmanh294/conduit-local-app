/* eslint-disable no-underscore-dangle */
/* eslint-disable no-unused-vars */
import { apiSlice } from './apiSlice';

export const articlesApiSlice = apiSlice.injectEndpoints({
  endpoints: builder => ({
    getArticles: builder.query({
      query: data => `/articles?limit=${data.limit}&skip=${data.skip}`,
      providesTags: (result, error, arg) => [
        { type: 'Articles', id: 'LIST' },
        ...result.articles.map(article => ({
          type: 'Articles',
          ...article._id,
        })),
      ],
      keepUnusedDataFor: 60 * 5,
    }),
    getArticle: builder.query({
      query: id => `/article/${id}`,
      providesTags: ['Article'],
      keepUnusedDataFor: 60 * 5,
    }),
    getUsernameArticles: builder.query({
      query: param =>
        `/articles/${param.id}/articles?limit=${param.limit}&skip=${param.skip}`,
      providesTags: (result, error, arg) => [
        { type: 'Articles', id: 'LIST' },
        ...result.articles.map(article => ({
          type: 'Articles',
          ...article._id,
        })),
      ],
      keepUnusedDataFor: 60 * 5,
    }),
    getFavoritesArticles: builder.query({
      query: param =>
        `/articles/${param.id}/favorites?limit=${param.limit}&skip=${param.skip}`,
      providesTags: (result, error, arg) => [
        { type: 'Favorites', id: 'LIST' },
        ...result.articles.map(article => ({
          type: 'Favorites',
          ...article._id,
        })),
      ],
      keepUnusedDataFor: 60 * 5,
    }),
    getArticleByTag: builder.query({
      query: param =>
        `/articles?tag=${param.tag}&limit=${param.limit}&skip=${param.skip}`,
      providesTags: (result, error, arg) => [
        { type: 'Articles', id: 'LIST' },
        ...result.articles.map(article => ({
          type: 'Articles',
          ...article._id,
        })),
      ],
      keepUnusedDataFor: 60 * 5,
    }),
    getFollowArticles: builder.query({
      query: param =>
        `/articles/follows?limit=${param.limit}&skip=${param.skip}`,
      providesTags: ['Follows'],
      keepUnusedDataFor: 60 * 5,
    }),
    getTags: builder.query({
      query: () => '/tags',
      providesTags: ['Tag'],
      keepUnusedDataFor: 60 * 5,
    }),
    updateArticle: builder.mutation({
      query: data => ({
        url: `/article/${data.slug}`,
        method: 'PATCH',
        body: { ...data },
      }),
      invalidatesTags: [{ type: 'Article' }, { type: 'Articles', id: 'LIST' }],
    }),
    createArticle: builder.mutation({
      query: data => ({
        url: '/article',
        method: 'POST',
        body: { ...data },
      }),
      invalidatesTags: [{ type: 'Articles', id: 'LIST' }, { type: 'Tag' }],
    }),

    deleteArticle: builder.mutation({
      query: id => ({
        url: `/article/${id}`,
        method: 'DELETE',
        body: {},
      }),
      invalidatesTags: [{ type: 'Articles', id: 'LIST' }, { type: 'Tag' }],
    }),
    addToFavorites: builder.mutation({
      query: id => ({
        url: `/article/${id}/favorites`,
        method: 'PATCH',
        body: {},
      }),
      invalidatesTags: [
        { type: 'Favorites', id: 'LIST' },
        { type: 'Articles', id: 'LIST' },
        { type: 'Article' },
      ],
    }),

    login: builder.mutation({
      query: credentials => ({
        url: '/users/login',
        method: 'POST',
        body: { ...credentials },
      }),
      invalidatesTags: [{ type: 'Follows' }, { type: 'Articles', id: 'LIST' }],
    }),
    uploadSingleVideo: builder.mutation({
      query(data) {
        return {
          url: 'article/video',
          method: 'POST',
          credentials: 'include',
          body: data,
        };
      },
    }),
  }),
});
export const {
  useGetArticlesQuery,
  useGetArticleQuery,
  useCreateArticleMutation,
  useAddToFavoritesMutation,
  useGetFavoritesArticlesQuery,
  useUpdateArticleMutation,
  useDeleteArticleMutation,
  useGetFollowArticlesQuery,
  useGetUsernameArticlesQuery,
  useGetArticleByTagQuery,
  useLoginMutation,
  useGetTagsQuery,
  useUploadSingleVideoMutation,
} = articlesApiSlice;
