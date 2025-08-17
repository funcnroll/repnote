import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { generateId } from "../helpers/generateId";
import { loadTemplatesFromLocalStorage } from "./localStorage";

// Exercise data structure for individual exercises within templates
interface Exercise {
  id: string;
  exerciseName: string;
  sets: number;
  reps: number;
  setsDone?: number;    // Tracks progress during workout execution

  //TODO: optional until commonExercises is finished
  exerciseId?: string | null;  // Reference to common exercise database
  isCustom?: boolean | null;   // Flag for user-created vs predefined exercises
}

// Complete workout template containing multiple exercises
export interface Template {
  id: string;
  name: string;
  exercises: Exercise[];
}

// Temporary template object used during template creation/editing
// Separated from main templates to allow draft states without affecting saved data
interface TmpTemplateObj {
  exercises: Exercise[];
  id: string;
  name: string;
}

// Main state structure for template management
interface State {
  templates: Template[];           // All saved workout templates
  tmpTemplate: TmpTemplateObj;     // Draft template being created/edited
  // TODO: Optional until starting a workout is finished
  isTemplateActive?: boolean;      // Tracks if user is currently in a workout
  templateToView: Template | null; // Template selected for viewing/starting
}

// Default empty template used for resetting the temporary template
const defaultTmpTemplate: TmpTemplateObj = {
  exercises: [],
  id: "",
  name: "",
};

const initialState: State = {
  // Load existing templates from localStorage, or start with empty array
  templates: loadTemplatesFromLocalStorage() || [],

  tmpTemplate: defaultTmpTemplate,
  isTemplateActive: false,
  templateToView: null,
};
const templateSlice = createSlice({
  name: "templates",
  initialState,
  reducers: {
    // Initialize a new temporary template for creation
    createTmpTemplate(state) {
      const id = generateId();
      state.tmpTemplate = {
        exercises: [],
        id,
        name: "",
      };
    },

    // Load an existing template into the temporary template for editing
    loadTmpTemplate(state, action: PayloadAction<string>) {
      const templateId = action.payload;

      const found = state.templates.find(
        (t) => String(t.id) === String(templateId)
      );

      // Load template into tmpTemplate for editing
      if (found) {
        state.tmpTemplate = {
          id: found.id,
          name: found.name ?? "",
          // Deep clone exercises to prevent mutations affecting the original
          exercises: found.exercises
            ? found.exercises.map((e) => ({ ...e } as Exercise))
            : [],
        };
      } else {
        // Reset to default if template not found
        state.tmpTemplate = defaultTmpTemplate;
      }
    },

    // Update the name of the template being created/edited
    editTemplateName(state, action: PayloadAction<string>) {
      state.tmpTemplate.name = action.payload;
    },

    // Save the temporary template as a new template in the main templates array
    addTemplate(
      state,
      action: PayloadAction<{
        templateName: string;
        tmpTemplate: TmpTemplateObj;
      }>
    ) {
      const { templateName: name, tmpTemplate } = action.payload;
      const { exercises, id } = tmpTemplate;

      state.templates.push({
        name,
        exercises,
        id,
      });

      // Clear the temporary template after saving
      state.tmpTemplate = defaultTmpTemplate;
    },
    // Remove a template from the templates array
    deleteTemplate(state, action: PayloadAction<string>) {
      const templateId = action.payload;

      state.templates = state.templates.filter(
        (template) => template.id !== String(templateId)
      );
    },

    // Update an existing template with changes from the temporary template
    updateTemplate(state, action: PayloadAction<TmpTemplateObj>) {
      const templateIdToUpdate = state.tmpTemplate.id;

      const index = state.templates.findIndex(
        (template) => template.id === templateIdToUpdate
      );

      if (index !== -1) {
        state.templates[index] = action.payload;
      }

      // Clear the temporary template after updating
      state.tmpTemplate = defaultTmpTemplate;
    },

    // Add a new exercise to the temporary template
    addExerciseToTemplate(
      state,
      action: PayloadAction<{
        exerciseName: string;
        sets: number;
        reps: number;
        setsDone?: number;
        exerciseId?: string | null;
        isCustom?: boolean | null;
      }>
    ) {
      const {
        exerciseName,
        sets,
        reps,
        setsDone = 0,
        exerciseId = null,
        isCustom = null,
      } = action.payload;

      const id = generateId();
      state.tmpTemplate.exercises.push({
        id,
        exerciseName,
        sets,
        reps,
        setsDone,
        exerciseId,
        isCustom,
      });
    },
    // Remove an exercise from the temporary template
    removeExerciseFromTemplate(state, action: PayloadAction<string>) {
      const exerciseId = action.payload;

      state.tmpTemplate.exercises = state.tmpTemplate.exercises.filter(
        (exercise) => exercise.id !== exerciseId
      );
    },
    // Update an existing exercise in the temporary template
    editExerciseInTemplate(
      state,
      action: PayloadAction<{
        id: string;
        exerciseName: string;
        sets: number;
        reps: number;
        exerciseId?: string | null;
        isCustom?: boolean | null;
      }>
    ) {
      const {
        id,
        exerciseName,
        sets,
        reps,
        exerciseId = null,
        isCustom = null,
      } = action.payload;

      const index = state.tmpTemplate.exercises.findIndex(
        (exercise) => exercise.id === id
      );

      if (index !== -1) {
        const currentExercise = state.tmpTemplate.exercises[index];

        if (currentExercise) {
          // Preserve the setsDone value while updating other fields
          state.tmpTemplate.exercises[index] = {
            id: currentExercise.id,
            exerciseName,
            sets,
            reps,
            exerciseId,
            isCustom,
            setsDone: currentExercise.setsDone,
          };
        }
      }
    },

    // Reorder exercises within the temporary template (drag and drop functionality)
    reorderExerciseInTemplate(
      state,
      action: PayloadAction<{ from: number; to: number }>
    ) {
      const { from, to } = action.payload;
      const list = state.tmpTemplate.exercises;

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
      if (moved) {
        copy.splice(to, 0, moved);
        state.tmpTemplate.exercises = copy;
      }
    },
    // Placeholder for starting a workout with a template (not yet implemented)
    startTemplate(_state, _action) {},
  },
});

export const {
  addTemplate,
  editExerciseInTemplate,
  addExerciseToTemplate,
  createTmpTemplate,
  removeExerciseFromTemplate,
  deleteTemplate,
  editTemplateName,
  loadTmpTemplate,
  updateTemplate,
  reorderExerciseInTemplate,
} = templateSlice.actions;

export default templateSlice.reducer;
