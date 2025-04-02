import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  session: "",
  isLoggedIn: false,
  loading: false,
  user: null,
};

const auth = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setSession: (state, action) => {
      state.session = action.payload;
      state.isLoggedIn = !!action.payload;
    },
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
    setUser: (state, action) => {
      state.user = action.payload;
    },
    clearAuth: (state) => {
      state.session = "";
      state.isLoggedIn = false;
      state.user = null;
    },
  },
});

export const { setSession, setLoading, setUser, clearAuth } = auth.actions;
export default auth.reducer;

export const selectSession = (state: { auth: typeof initialState }) =>
  state.auth.session;
export const selectIsLoggedIn = (state: { auth: typeof initialState }) =>
  state.auth.isLoggedIn;
export const selectLoading = (state: { auth: typeof initialState }) =>
  state.auth.loading;
export const selectUser = (state: { auth: typeof initialState }) =>
  state.auth.user;
