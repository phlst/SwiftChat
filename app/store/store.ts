import { configureStore } from "@reduxjs/toolkit";
import { createWrapper } from "next-redux-wrapper";
import authReducer from "./authSlice/auth";
import messengerReducer from "./messengerSlice/messenger";

const makeStore = () =>
  configureStore({
    reducer: {
      auth: authReducer,
      messenger: messengerReducer,
    },
  });

export type RootState = ReturnType<ReturnType<typeof makeStore>["getState"]>;
export type AppDispatch = ReturnType<typeof makeStore>["dispatch"];

export const wrapper = createWrapper(makeStore);
