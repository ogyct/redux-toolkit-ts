import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/query/react";
import {Post} from "./PostsSlice";

type PostsResponse = Post[];

export const postsApi = createApi({
    reducerPath: 'postsApi',
    baseQuery: fetchBaseQuery({baseUrl: 'https://jsonplaceholder.typicode.com/posts/'}),
    tagTypes: ['Post'],
    endpoints: (builder) => ({
        getPostsByUserId: builder.query<PostsResponse, number>({
            query: (id) => `?userId=${id}`,
            providesTags: (result) =>
                result ? [
                        ...result.map(({id}) => ({type: 'Post', id} as const)),
                        {type: 'Post', id: 'LIST'},
                    ]
                    : [{type: 'Post', id: 'LIST'}],
        }),
        getPost: builder.query<Post, number>({
            query: (id) => `/${id}`,
            providesTags: (result, error, id) => [{ type: 'Post', id }],
        }),
        updatePost: builder.mutation<Post, Pick<Post, 'id'> & Partial<Post>>({
            query({id, ... patch}) {
                return {
                    url: `/${id}`,
                    method: 'PATCH',
                    body: patch
                }
            }
        }),
        deletePost: builder.mutation<void, number>({
                query(id) {
                    return {
                        url: `${id}`,
                        method: 'DELETE',
                    }
                },
                invalidatesTags: (result, error, id) => [{type: 'Post', id}],
            }
        )
    }),

})

export const {
    useGetPostsByUserIdQuery, useDeletePostMutation
    , useUpdatePostMutation, useGetPostQuery
} = postsApi;