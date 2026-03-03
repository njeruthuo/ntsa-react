import { createSlice } from "@reduxjs/toolkit";

export interface AuthState {
  isLoggedIn: boolean;
  token: string;
  user_id: string;
  client_id: string;
  contact_id: string;
  client_name: string;
}

const storedToken = localStorage.getItem("token");

const initialState: AuthState = {
  isLoggedIn: !!storedToken,
  token: "",
  user_id: "",
  client_id: "",
  contact_id: "",
  client_name: "",
};

export const authSlice = createSlice({
  name: "authSlice",
  initialState,
  reducers: {
    logout: (state) => ({ ...state, ...initialState }),
    setCredentials: (state, action) => {
      return {
        ...state,
        ...action.payload,
        isLoggedIn: true,
      };
    },
  },
});

export const { logout, setCredentials } = authSlice.actions;

export default authSlice.reducer;
