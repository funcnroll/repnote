import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { generateId } from "../helpers/generateId";
import { loadTemplatesFromLocalStorage } from "./localStorage";
import { Exercise } from "@/types/Exercise";
import { Set } from "@/types/Set";
import { exerciseUtils } from "./exerciseUtils";
import { templateUtils } from "./templateUtils";

// Complete workout template containing multiple exercises
export interface Template {
  id: string;
  name: string;
  exercises: Exercise[];
}

// Temporary template object used during template creation/editing
// Separated from main templates to allow draft states without affecting saved data
export interface DraftTemplate {
  exercises: Exercise[];
  id: string;
  name: string;
}

// Main state structure for template management
interface State {
  templates: Template[]; // All saved workout templates
  draftTemplate: DraftTemplate; // Draft template being created/edited
  // TODO: Optional until starting a workout is finished
  templateToView: Template | null; // Template selected for viewing/starting
}

// Default empty template used for resetting the temporary template
const defaultDraftTemplate: DraftTemplate = {
  exercises: [],
  id: "",
  name: "",
};

const initialState: State = {
  // Load existing templates from localStorage, or start with empty array
  templates: loadTemplatesFromLocalStorage() || [],

  draftTemplate: defaultDraftTemplate,
  templateToView: null,
};
const templateSlice = createSlice({
  name: "templates",
  initialState,
  reducers: {
    // Initialize a new temporary template for creation
    createDraftTemplate(state) {
      const id = generateId();
      state.draftTemplate = {
        exercises: [],
        id,
        name: "",
      };
    },

    // Load an existing template into the temporary template for editing
    loadDraftTemplate(state, action: PayloadAction<string>) {
      const templateId = action.payload;

      const found = state.templates.find(
        (t) => String(t.id) === String(templateId)
      );

      // Load template into draftTemplate for editing
      if (found) {
        state.draftTemplate = {
          id: found.id,
          name: found.name ?? "",
          // Deep clone exercises to prevent mutations affecting the original
          exercises: found.exercises
            ? found.exercises.map((e) => ({
                ...e,
                sets: e.sets.map((set) => ({ ...set })),
              } as Exercise))
            : [],
        };
      } else {
        // Reset to default if template not found
        state.draftTemplate = defaultDraftTemplate;
      }
    },

    // Update the name of the template being created/edited
    editTemplateName(state, action: PayloadAction<string>) {
      state.draftTemplate.name = action.payload;
    },

    // Save the temporary template as a new template in the main templates array
    addTemplate(
      state,
      action: PayloadAction<{
        templateName: string;
        draftTemplate: DraftTemplate;
      }>
    ) {
      // No separate function needed as this is just a basic array operation

      const { templateName: name, draftTemplate } = action.payload;
      const { exercises, id } = draftTemplate;

      state.templates.push({
        name,
        exercises,
        id,
      });

      // Clear the temporary template after saving
      state.draftTemplate = defaultDraftTemplate;
    },
    // Remove a template from the templates array
    deleteTemplate(state, action: PayloadAction<string>) {
      const templateId = action.payload;

      state.templates = templateUtils.delete(templateId, state.templates);
    },

    // Update an existing template with changes from the temporary template
    updateTemplate(state, action: PayloadAction<DraftTemplate>) {
      const templateIdToUpdate = state.draftTemplate.id;

      state.templates = templateUtils.update(
        templateIdToUpdate,
        state.templates,
        action.payload
      );

      // Clear the temporary template after updating
      state.draftTemplate = defaultDraftTemplate;
    },

    // Add a new exercise to the temporary template
    addExerciseToTemplate(
      state,
      action: PayloadAction<Omit<Exercise, "id"> | Exercise>
    ) {
      const exercise = action.payload;

      const exerciseWithId = exerciseUtils.ensureHasId(exercise);

      state.draftTemplate.exercises.push(exerciseWithId);
    },

    addSetToExerciseInTemplate(
      state,
      action: PayloadAction<{ exerciseId: string; set: Set }>
    ) {
      const { exerciseId, set } = action.payload;

      const exercise = exerciseUtils.find(
        exerciseId,
        state.draftTemplate.exercises
      );

      if (exercise) exercise.sets.push(set);
    },
    // Remove an exercise from the temporary template
    removeExerciseFromTemplate(state, action: PayloadAction<string>) {
      const exerciseId = action.payload;

      state.draftTemplate.exercises = exerciseUtils.filterOut(
        exerciseId,
        state.draftTemplate.exercises
      );
    },
    // Update an existing exercise in the temporary template
    editExerciseInTemplate(state, action: PayloadAction<Exercise>) {
      const { id, exerciseName, sets } = action.payload;

      state.draftTemplate.exercises = exerciseUtils.edit(
        id,
        exerciseName,
        sets,
        state.draftTemplate.exercises
      );
    },

    // Reorder exercises within the temporary template
    reorderExerciseInTemplate(
      state,
      action: PayloadAction<{ from: number; to: number }>
    ) {
      const { from, to } = action.payload;

      state.draftTemplate.exercises = exerciseUtils.reorder(
        from,
        to,
        state.draftTemplate.exercises
      );
    },

    // Optionally update specific template data with activeTemplate
    updateTemplateFromActive(
      state,
      action: PayloadAction<{ templateId: string; exercises: Exercise[] }>
    ) {
      const { templateId, exercises } = action.payload;

      const templateToModify = templateUtils.find(templateId, state.templates);

      // Reset all completed flags when saving exercises back to template
      const resetExercises = exercises.map((exercise) => ({
        ...exercise,
        sets: exercise.sets.map((set) => ({
          ...set,
          completed: false,
        })),
      }));

      // Tell TS that this element will ALWAYS exist
      state.templates[templateToModify]!.exercises = resetExercises;
    },
  },
});

export const {
  addTemplate,
  editExerciseInTemplate,
  addExerciseToTemplate,
  createDraftTemplate,
  removeExerciseFromTemplate,
  deleteTemplate,
  editTemplateName,
  loadDraftTemplate,
  updateTemplate,
  reorderExerciseInTemplate,
  updateTemplateFromActive,
} = templateSlice.actions;

export default templateSlice.reducer;
