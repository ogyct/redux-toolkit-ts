import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface MyUser {
  publicId: string
  name: string
}
const initialState = {
  user: {} as MyUser,
  isAuthenticated: false,
}

export const authSlice = createSlice({
  name: 'Auth',
  initialState: initialState,
  reducers: {
    setAuth: (state, action : PayloadAction<MyUser>) => {
      state.user = action.payload;
    }
  }
});
