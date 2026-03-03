import { VITE_BASE_URL } from "@/system/constants";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { setCredentials } from "./authSlice";

export const authApi = createApi({
  reducerPath: "authApi",
  baseQuery: fetchBaseQuery({ baseUrl: VITE_BASE_URL }),
  endpoints: (builder) => ({
    loginUser: builder.mutation<LoginResponse, UserLoginPayload>({
      query: (body) => ({
        url: `/authservice/auth/login`,
        method: "POST",
        body,
      }),
      async onQueryStarted(_, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          const user = data.data.selectUsersByUsernamePassword[0];

          if (user) {
            dispatch(setCredentials({ ...user, token: data.data.token }));
            localStorage.setItem("token", data.data.token);
          }
        } catch (err) {
          console.error("Login failed:", err);
        }
      },
    }),
  }),
});

export const { useLoginUserMutation } = authApi;

interface UserLoginPayload {
  username: string;
  password: string;
}

export interface LoginUser {
  user_id: number;
  client_id: number;
  contact_id: number;
  client_name: string;

  __typename: string;
}

export interface LoginResponse {
  data: {
    selectUsersByUsernamePassword: LoginUser[];
    token: string;
  };
}
