import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { Post } from "../common/common";

type PostsResponse = Post[];

export const postsApi = createApi({
  baseQuery: fetchBaseQuery({
    baseUrl: "/",
  }),
  tagTypes: ["Post"],
  endpoints: (build) => ({
    getPosts: build.query<PostsResponse, void>({
      query: () => "posts",
      providesTags: (result) =>
        result
          ? [
              ...result.map((post) => ({ type: "Post" as const, id: post.id })),
              { type: "Post", id: "LIST" },
            ]
          : [{ type: "Post", id: "LIST" }],
    }),
    addPost: build.mutation<Post, Partial<Post>>({
      query: (body) => ({
        url: `posts`,
        method: "POST",
        body,
      }),
      invalidatesTags: [{ type: "Post", id: "LIST" }],
    }),
    getPost: build.query<Post, string>({
      query: (id) => `posts/${id}`,
      providesTags: (result, error, id) => [{ type: "Post", id }],
    }),
    updatePost: build.mutation<void, Pick<Post, "id"> & Partial<Post>>({
      query: ({ id, ...patch }) => ({
        url: `posts/${id}`,
        method: "PUT",
        body: patch,
      }),
      invalidatesTags: (result, error, { id }) => [{ type: "Post", id }],
      async onQueryStarted({ id, ...patch }, api) {
        api.dispatch(
          postsApi.util.updateQueryData("getPost", id, (draft) =>
            Object.assign(draft, patch)
          )
        );
      },
    }),
    deletePost: build.mutation<void, string>({
      query(id) {
        return {
          url: `posts/${id}`,
          method: "DELETE",
          responseHandler: (resp) => resp.text(),
        };
      },

      invalidatesTags: (result, error, id) => [{ type: "Post", id }],
    }),
  }),
});

export const {
  useGetPostsQuery,
  useDeletePostMutation,
  useUpdatePostMutation,
  useGetPostQuery,
  useAddPostMutation,
} = postsApi;
