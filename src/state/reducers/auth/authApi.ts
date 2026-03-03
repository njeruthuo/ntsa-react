import { createApi } from "@reduxjs/toolkit/query/react";
import { setCredentials } from "./authSlice";
import { baseQuery } from "../baseQuery";

export const authApi = createApi({
  reducerPath: "authApi",
  baseQuery: baseQuery,
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
            Object.entries(user).forEach(([key, value]) => {
              const valueToString =
                typeof value === "object"
                  ? JSON.stringify(value)
                  : String(value);
              localStorage.setItem(key, valueToString);
            });
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
