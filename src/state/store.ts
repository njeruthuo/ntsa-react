import { configureStore } from "@reduxjs/toolkit";
import { authApi, assetsApi, authReducer } from "./reducers";

export const store = configureStore({
  reducer: {
    [authApi.reducerPath]: authApi.reducer,
    [assetsApi.reducerPath]: assetsApi.reducer,

    auth: authReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat([authApi.middleware, assetsApi.middleware]),
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
