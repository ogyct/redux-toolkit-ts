import {
  createAsyncThunk,
  createEntityAdapter,
  createSlice,
  PayloadAction,
} from "@reduxjs/toolkit";
import { RootState } from "../store";

export interface Post {
  id: number;
  title: string;
  body: string;
}

export enum LoadingStatus {
  IDLE = "idle",
  LOADING = "loading",
  READY = "ready",
  ERROR = "error",
}

const postsEntityAdapter = createEntityAdapter<Post>({
  sortComparer(a, b) {
    return b.id - a.id;
  },
});
const initialState = postsEntityAdapter.getInitialState({
  postsStatus: LoadingStatus.IDLE,
});

export const fetchPosts = createAsyncThunk(
  "Posts/fetchPosts",
  async (_, thunkAPI) => {
    const result = await fetch(
      "https://jsonplaceholder.typicode.com/posts/?userId=1"
    );
    return (await result.json()) as Post[];
  }
);

export const putUpdatedPost = createAsyncThunk(
  "Posts/updatePost",
  async (post: Post) => {
    const result = await fetch(
      `https://jsonplaceholder.typicode.com/posts/${post.id}`,
      {
        method: "PUT",
        body: JSON.stringify(post),
        headers: {
          "Content-type": "application/json; charset=UTF-8",
        },
      }
    );
    return (await result.json()) as Post;
  }
);

export const postsSlice = createSlice({
  name: "Posts",
  initialState,
  reducers: {
    addPost: (state, action: PayloadAction<Post>) => {
      const max = state.ids.reduce((prev, current) =>
        prev > current ? prev : current
      );
      action.payload.id = +max + 1;
      postsEntityAdapter.addOne(state, action.payload);
    },
    deletePost: (state, action: PayloadAction<number>) => {
      postsEntityAdapter.removeOne(state, action.payload);
    },
    updatePost: (state, action: PayloadAction<Post>) => {
      postsEntityAdapter.upsertOne(state, action.payload);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchPosts.pending, (state) => {
        state.postsStatus = LoadingStatus.LOADING;
      })
      .addCase(fetchPosts.fulfilled, (state, action) => {
        state.postsStatus = LoadingStatus.READY;
        postsEntityAdapter.upsertMany(state, action.payload);
      })
      .addCase(putUpdatedPost.fulfilled, (state, action) => {
        state.postsStatus = LoadingStatus.READY;
        postsEntityAdapter.upsertOne(state, action.payload);
      });
  },
});

export const { addPost, deletePost, updatePost } = postsSlice.actions;
export const postSelectors = postsEntityAdapter.getSelectors<RootState>(
  (state) => state.posts
);
