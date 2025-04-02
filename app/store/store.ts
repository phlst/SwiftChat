import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./authSlice/auth";
import messengerReducer from "./messengerSlice/messenger";

const store = configureStore({
  reducer: {
    auth: authReducer,
    messenger: messengerReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
