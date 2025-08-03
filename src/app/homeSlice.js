import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  name: "",
  isWorkingOut: false,
};

const homeSlice = createSlice({
  name: "home",
  initialState,
  reducers: {
    changeName(state, action) {
      state.name = action.payload;
    },
    isWorkingOut(state, action) {
      state.isWorkingOut = true;
    },
    isNotWorkingOut(state, action) {
      state.isWorkingOut = false;
    },
  },
});

export const { changeName, isWorkingOut, isNotWorkingOut } = homeSlice.actions;

export default homeSlice.reducer;
