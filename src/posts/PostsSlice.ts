import {createAsyncThunk, createSlice, PayloadAction} from "@reduxjs/toolkit";


export interface Post {
    id: number,
    title: string,
    body: string
}

export enum PostStatus {
    IDLE = 'idle',
    LOADING = 'loading',
    READY = 'ready'
}

// const initialState: Post[] = [{id: 0, title: 'Initial', body: 'Post'}];
const initialState = {
    posts: [] as Post[],
    status: PostStatus.IDLE
};

export const fetchPosts = createAsyncThunk('Posts/fetchPosts', async () => {
    console.log('fetching')
    const posts = await fetch('https://jsonplaceholder.typicode.com/posts');
    return (await posts.json()) as Post[];
});

export const postsSlice = createSlice({
    name: 'Posts',
    initialState,
    reducers: {
        addPost: (state, action: PayloadAction<Post>) => {
            const max = Math.max.apply(Math, state.posts.map(post => post.id));
            const id = (isFinite(max) ? max : 0.0) + 1;
            state.posts.unshift({...action.payload, id: id});
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
        builder.addCase(fetchPosts.pending, (state, action) => {
            state.status = PostStatus.LOADING
        })
            .addCase(fetchPosts.fulfilled, (state, action) => {
                state.status = PostStatus.READY
                state.posts = state.posts.concat(action.payload)
            });
    }
});

export const {addPost, deletePost, updatePost} = postsSlice.actions;




