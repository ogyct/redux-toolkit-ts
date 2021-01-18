import { Action, configureStore } from '@reduxjs/toolkit';
import counterReducer from '../features/counter/counterSlice';
import { postsSlice } from "../posts/PostsSlice";
import { useDispatch } from 'react-redux';
import { ThunkAction } from 'redux-thunk';
import { authSlice } from '../auth/AuthSlice';

export const store = configureStore({
  reducer: {
    counter: counterReducer,
    posts: postsSlice.reducer,
    auth: authSlice.reducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
export type AppDispatch = typeof store.dispatch;
export const useAppDispatch = () => useDispatch<AppDispatch>();
