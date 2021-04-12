import {
  createAsyncThunk,
  createEntityAdapter,
  createSlice,
} from "@reduxjs/toolkit";
import { RootState } from "../store";
import { LoadingStatus } from "./PostsSlice";

export interface Comment {
  postId: number;
  id: number;
  name: string;
  email: string;
  body: string;
}

const commentEntityAdapter = createEntityAdapter<Comment>();

const initialState = commentEntityAdapter.getInitialState({
  loadingStatus: LoadingStatus.IDLE,
});

export const fetchPostComments = createAsyncThunk(
  "fetchPostComments",
  async (id: string) => {
    const response = await fetch(
      `https://jsonplaceholder.typicode.com/comments?postId=${id}`
    );
    return (await response.json()) as Comment[];
  }
);

export const commentsSlice = createSlice({
  name: "comments",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchPostComments.pending, (state) => {
      state.loadingStatus = LoadingStatus.LOADING;
    });
    builder.addCase(fetchPostComments.fulfilled, (state, action) => {
      commentEntityAdapter.upsertMany(state, action.payload);
      state.loadingStatus = LoadingStatus.READY;
    });
  },
});

export const commentsSelector = commentEntityAdapter.getSelectors<RootState>(
  (state) => state.comments
);
