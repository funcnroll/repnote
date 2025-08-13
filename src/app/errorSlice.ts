import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface ErrorState {
  addTemplate: string;
  addExercise: string;
}

const initialState: ErrorState = {
  addTemplate: "",
  addExercise: "",
};

const errorSlice = createSlice({
  name: "error",
  initialState,
  reducers: {
    setAddTemplateError(state, action: PayloadAction<string>) {
      state.addTemplate = action.payload;
    },
    setAddExerciseError(state, action: PayloadAction<string>) {
      state.addExercise = action.payload;
    },
    clearAddTemplateError(state) {
      state.addTemplate = "";
    },
    clearAddExerciseError(state) {
      state.addExercise = "";
    },
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