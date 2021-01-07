import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";


export interface Post {
    id: number,
    title: string,
    body: string,
}

export interface Comment {
    postId: number,
    id: number,
    name: string,
    email: string,
    body: string
}

export enum LoadingStatus {
    IDLE = 'idle',
    LOADING = 'loading',
    READY = 'ready'
}

const initialState = {
    comments: [] as Comment[],
    posts: [] as Post[],
    postsStatus: LoadingStatus.IDLE,
    commentsStatus: LoadingStatus.IDLE,
};


export const fetchPosts = createAsyncThunk('Posts/fetchPosts', async (_, thunkAPI) => {
    const result = await fetch('https://jsonplaceholder.typicode.com/posts');
    const posts = await result.json() as Post[];
    // thunkAPI.dispatch(fetchComments(posts[0].id));
    return posts;
});

export const fetchComments = createAsyncThunk('Posts/fetchComments', async (id: number) => {
    const result = await fetch(`https://jsonplaceholder.typicode.com/posts/${id}/comments`);
    return await result.json() as Comment[];
});

export const postsSlice = createSlice({
    name: 'Posts',
    initialState,
    reducers: {
        addPost: (state, action: PayloadAction<Post>) => {
            const max = Math.max.apply(Math, state.posts.map(post => post.id));
            const id = (isFinite(max) ? max : 0.0) + 1;
            state.posts.unshift({ ...action.payload, id: id });
        },
        deletePost: (state, action: PayloadAction<number>) => {
            state.posts = state.posts.filter(state => state.id !== action.payload);
        },
        updatePost: (state, action: PayloadAction<Post>) => {
            const index = state.posts.findIndex(e => e.id === action.payload.id);
            state.posts[index] = action.payload;
        }
    },
    extraReducers: builder => {
        builder.addCase(fetchPosts.pending, (state) => {
            state.postsStatus = LoadingStatus.LOADING;
        })
          .addCase(fetchPosts.fulfilled, (state, action) => {
              state.postsStatus = LoadingStatus.READY;
              state.posts = state.posts.concat(action.payload);
          })
          .addCase(fetchComments.pending, (state) => {
              state.commentsStatus = LoadingStatus.LOADING;
          })
          .addCase(fetchComments.fulfilled, (state, action) => {
              state.commentsStatus = LoadingStatus.READY;
              state.comments = state.comments.concat(action.payload);
          })
        ;
    }
});

export const {addPost, deletePost, updatePost} = postsSlice.actions;




