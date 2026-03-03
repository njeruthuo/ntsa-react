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
    logout: (state) => {
      console.log(state, "state now");
      localStorage.removeItem("token");
      localStorage.removeItem("user_id");
      localStorage.removeItem("client_id");
      localStorage.removeItem("contact_id");
      localStorage.removeItem("client_name");
      state.isLoggedIn = false;
    },
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
