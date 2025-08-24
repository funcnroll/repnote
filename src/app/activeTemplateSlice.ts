import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Exercise } from "@/types/Exercise";

// Active template object used during workout sessions
interface ActiveTemplate {
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
      // TODO: Add finished workouts to localStorage and then display sets done
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
  },
});

export const {
  startTemplate,
  finishTemplate,
  removeExerciseFromActiveTemplate,
  reorderExerciseInActiveTemplate,
} = activeTemplateSlice.actions;

export default activeTemplateSlice.reducer;
