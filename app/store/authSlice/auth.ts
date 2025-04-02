import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  session: "",
};

const auth = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setSession: (state, action) => {
      state.session = action.payload;
    },
  },
});
export const { setSession } = auth.actions;
export default auth.reducer;
