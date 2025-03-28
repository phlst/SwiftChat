import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  active: 2,
  name: "",
};

const messenger = createSlice({
  name: "messenger",
  initialState,
  reducers: {
    changeName: (state, action) => {
      state.name = action.payload;
    },
  },
});

export const { changeName } = messenger.actions;
export default messenger.reducer;
