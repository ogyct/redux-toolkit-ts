import {createSlice, PayloadAction} from "@reduxjs/toolkit";


export interface Post {
    id: number,
    title: string,
    text: string
}

const initialState: Post[] = [{id: 0, title: 'Initial', text: 'Post'}];

export const postsSlice = createSlice({
    name: 'Posts',
    initialState,
    reducers: {
        addPost: (state, action: PayloadAction<Post>) => {
            const max = Math.max.apply(Math, state.map(post => post.id));
            const id = (isFinite(max) ? max : 0.0) + 1;
            state.unshift({...action.payload, id: id});
        },
        deletePost: (state, action: PayloadAction<number>) => {
            return state.filter(state => state.id !== action.payload);
        },
        updatePost: (state, action: PayloadAction<Post>) => {
            const index = state.findIndex(e => e.id === action.payload.id);
            state[index] = action.payload;
        }
    }
});

export const {addPost, deletePost, updatePost} = postsSlice.actions;

