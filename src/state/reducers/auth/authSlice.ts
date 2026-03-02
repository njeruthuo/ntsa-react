import { createSlice } from "@reduxjs/toolkit";

export interface AuthState {
  isLoggedIn: boolean;
}

const initialState: AuthState = {
  isLoggedIn: true,
};

export const authSlice = createSlice({
  name: "authSlice",
  initialState,
  reducers: {
    logout: (state) => {
      state.isLoggedIn = false;
    },
  },
});

export const { logout } = authSlice.actions;

export default authSlice.reducer;
