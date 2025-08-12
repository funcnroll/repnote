import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface HomeState {
  name: string;
  isWorkingOut: boolean;
}

const initialState: HomeState = {
  name: "",
  isWorkingOut: false,
};

const homeSlice = createSlice({
  name: "home",
  initialState,
  reducers: {
    changeName(state, action: PayloadAction<string>) {
      state.name = action.payload;
    },
    isWorkingOut(state) {
      state.isWorkingOut = true;
    },
    isNotWorkingOut(state) {
      state.isWorkingOut = false;
    },
  },
});

export const { changeName, isWorkingOut, isNotWorkingOut } = homeSlice.actions;

export default homeSlice.reducer;
