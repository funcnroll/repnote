import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { loadNameFromLocalStorage, loadActiveTemplateFromLocalStorage } from "./localStorage";

// State for user profile and workout session status
interface HomeState {
  name: string; // User's name for personalization
  isWorkingOut: boolean; // Whether user is currently in an active workout
}

const initialState: HomeState = {
  name: loadNameFromLocalStorage() || "",
  // Automatically determine if user is working out based on whether there's an active template
  isWorkingOut: loadActiveTemplateFromLocalStorage() !== null,
};

const homeSlice = createSlice({
  name: "home",
  initialState,
  reducers: {
    // Update the user's name
    changeName(state, action: PayloadAction<string>) {
      state.name = action.payload;
    },
    // Mark that user has started a workout session
    isWorkingOut(state) {
      state.isWorkingOut = true;
    },
    // Mark that user has ended their workout session
    isNotWorkingOut(state) {
      state.isWorkingOut = false;
    },
  },
});

export const { changeName, isWorkingOut, isNotWorkingOut } = homeSlice.actions;

export default homeSlice.reducer;
