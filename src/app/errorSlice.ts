import { createSlice, PayloadAction } from "@reduxjs/toolkit";

// State structure for managing form validation errors
interface ErrorState {
  addTemplate: string;  // Error message for template creation form
  addExercise: string;  // Error message for exercise creation form
}

const initialState: ErrorState = {
  addTemplate: "",
  addExercise: "",
};

const errorSlice = createSlice({
  name: "error",
  initialState,
  reducers: {
    // Set error message for template creation form
    setAddTemplateError(state, action: PayloadAction<string>) {
      state.addTemplate = action.payload;
    },
    // Set error message for exercise creation form
    setAddExerciseError(state, action: PayloadAction<string>) {
      state.addExercise = action.payload;
    },
    // Clear template creation error
    clearAddTemplateError(state) {
      state.addTemplate = "";
    },
    // Clear exercise creation error
    clearAddExerciseError(state) {
      state.addExercise = "";
    },
    // Clear all error messages
    clearAllErrors(state) {
      state.addTemplate = "";
      state.addExercise = "";
    },
  },
});

export const {
  setAddTemplateError,
  setAddExerciseError,
  clearAddTemplateError,
  clearAddExerciseError,
  clearAllErrors,
} = errorSlice.actions;

export default errorSlice.reducer;