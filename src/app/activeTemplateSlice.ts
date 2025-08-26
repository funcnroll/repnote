import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Exercise } from "@/types/Exercise";
import ActiveTemplate from "../pages/templates/ActiveTemplate";
import { saveFinishedWorkoutToLocalStorage } from "./localStorage";
import { CompletedWorkout } from "../types/CompletedWorkout";
import { getCurrentTimestamp } from "@/helpers/getCurrentTimeStamp";
import {
  calculateTotalSets,
  calculateCompletedSets,
} from "@/helpers/workoutCalculations";

// Active template object used during workout sessions
export interface ActiveTemplate {
  exercises: Exercise[];
  id: string;
  name: string;
}

// Main state structure for active template management
interface State {
  activeTemplate: ActiveTemplate | null; // Current active workout template
}

const initialState: State = {
  activeTemplate: null,
};

const activeTemplateSlice = createSlice({
  name: "activeTemplate",
  initialState,
  reducers: {
    // Start a workout with a template
    startTemplate(state, action: PayloadAction<ActiveTemplate>) {
      state.activeTemplate = action.payload;
    },

    // Finish the current workout and clear active template
    finishTemplate(state) {
      if (state.activeTemplate) {
        const completedWorkout: CompletedWorkout = {
          id: state.activeTemplate.id,
          name: state.activeTemplate.name,
          sets: calculateTotalSets(state.activeTemplate),
          completedSets: calculateCompletedSets(state.activeTemplate),
          timestamp: getCurrentTimestamp(),
          exercises: state.activeTemplate.exercises,
        };

        saveFinishedWorkoutToLocalStorage(completedWorkout);
      }

      state.activeTemplate = null;
    },

    // Remove an exercise from the active template during workout
    removeExerciseFromActiveTemplate(state, action: PayloadAction<string>) {
      const exerciseId = action.payload;
      if (state.activeTemplate?.exercises) {
        state.activeTemplate.exercises = state.activeTemplate.exercises.filter(
          (exercise) => exercise.id !== exerciseId
        );
      }
    },

    // Reorder exercises within the active template during workout
    reorderExerciseInActiveTemplate(
      state,
      action: PayloadAction<{ from: number; to: number }>
    ) {
      const { from, to } = action.payload;
      if (!state.activeTemplate?.exercises) return;

      const list = state.activeTemplate.exercises;

      // Validate indices to prevent array manipulation errors
      if (
        from === to ||
        from < 0 ||
        to < 0 ||
        from >= list.length ||
        to >= list.length
      )
        return;

      const copy = [...list];

      // Move exercise from 'from' index to 'to' index
      const movedArray = copy.splice(from, 1);
      const moved = movedArray[0];
      if (moved && state.activeTemplate) {
        copy.splice(to, 0, moved);
        state.activeTemplate.exercises = copy;
      }
    },

    toggleSetComplete(
      state,
      action: PayloadAction<{ exerciseId: string; setId: number }>
    ) {
      const { exerciseId, setId } = action.payload;
      const exercise = state.activeTemplate?.exercises.find(
        (ex) => ex.id === exerciseId
      );
      const set = exercise?.sets.find((s) => s.id === setId);
      if (set) {
        set.completed = !set.completed;
      }
    },

    updateSetReps(
      state,
      action: PayloadAction<{
        exerciseId: string;
        setId: number;
        actualReps: number;
      }>
    ) {
      const { exerciseId, setId, actualReps } = action.payload;

      const exercise = state.activeTemplate?.exercises.find(
        (ex) => ex.id === exerciseId
      );
      const set = exercise?.sets.find((set) => set.id === setId);
      if (set) {
        set.actualReps = actualReps;
      }
    },

    updateSetWeight(
      state,
      action: PayloadAction<{
        exerciseId: string;
        setId: number;
        weight: number | null;
      }>
    ) {
      const { exerciseId, setId, weight } = action.payload;

      const exercise = state.activeTemplate?.exercises.find(
        (ex) => ex.id === exerciseId
      );
      const set = exercise?.sets.find((set) => set.id === setId);
      if (set) {
        set.weight = weight;
      }
    },

    removeSetFromActiveTemplate(
      state,
      action: PayloadAction<{ exerciseId: string; setId: number }>
    ) {
      const { exerciseId, setId } = action.payload;

      const exercise = state.activeTemplate?.exercises.find(
        (ex) => ex.id === exerciseId
      );
      if (exercise) {
        exercise.sets = exercise.sets.filter((set) => set.id !== setId);
      }
    },

    editExerciseInActiveTemplate(state, action: PayloadAction<Exercise>) {
      const updatedExercise = action.payload;
      if (state.activeTemplate?.exercises) {
        const exerciseIndex = state.activeTemplate.exercises.findIndex(
          (exercise) => exercise.id === updatedExercise.id
        );
        if (exerciseIndex !== -1) {
          state.activeTemplate.exercises[exerciseIndex] = updatedExercise;
        }
      }
    },
  },
});

export const {
  startTemplate,
  finishTemplate,
  removeExerciseFromActiveTemplate,
  reorderExerciseInActiveTemplate,
  toggleSetComplete,
  updateSetReps,
  updateSetWeight,
  removeSetFromActiveTemplate,
  editExerciseInActiveTemplate,
} = activeTemplateSlice.actions;

export default activeTemplateSlice.reducer;
