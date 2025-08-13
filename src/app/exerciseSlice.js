import { createSlice } from "@reduxjs/toolkit";

const exerciseSlice = createSlice({
  name: "exercises",
  initialState: {
    // Store exercise data that can be shared across templates
    exerciseLibrary: [],
    // Current exercise being edited (for the AddExercise component)
    currentExercise: null,
  },
  reducers: {
    addExercise(state, action) {
      state.exerciseLibrary.push(action.payload);
    },
    removeExercise(state, action) {
      const exerciseId = action.payload;
      state.exerciseLibrary = state.exerciseLibrary.filter(
        (exercise) => exercise.id !== exerciseId
      );
    },
    editExercise(state, action) {
      const {
        id,
        exerciseName,
        sets,
        reps,
        exerciseId = null,
        isCustom = null,
      } = action.payload;

      const index = state.exerciseLibrary.findIndex(
        (exercise) => exercise.id === id
      );

      if (index !== -1) {
        state.exerciseLibrary[index] = {
          ...state.exerciseLibrary[index],
          exerciseName,
          sets,
          reps,
          exerciseId,
          isCustom,
        };
      }
    },
    setCurrentExercise(state, action) {
      state.currentExercise = action.payload;
    },
    clearCurrentExercise(state) {
      state.currentExercise = null;
    },
  },
});

export const {
  addExercise,
  removeExercise,
  editExercise,
  setCurrentExercise,
  clearCurrentExercise,
} = exerciseSlice.actions;

export default exerciseSlice.reducer;
