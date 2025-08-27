import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { generateId } from "../helpers/generateId";
import { loadTemplatesFromLocalStorage } from "./localStorage";
import { Exercise } from "@/types/Exercise";
import { Set } from "@/types/Set";

// Complete workout template containing multiple exercises
export interface Template {
  id: string;
  name: string;
  exercises: Exercise[];
}

// Temporary template object used during template creation/editing
// Separated from main templates to allow draft states without affecting saved data
interface DraftTemplate {
  exercises: Exercise[];
  id: string;
  name: string;
}

// Main state structure for template management
interface State {
  templates: Template[]; // All saved workout templates
  draftTemplate: DraftTemplate; // Draft template being created/edited
  // TODO: Optional until starting a workout is finished
  activeTemplate?: DraftTemplate | null; // Tracks current active template
  templateToView: Template | null; // Template selected for viewing/starting
}

// Default empty template used for resetting the temporary template
const defaultdraftTemplate: DraftTemplate = {
  exercises: [],
  id: "",
  name: "",
};

const initialState: State = {
  // Load existing templates from localStorage, or start with empty array
  templates: loadTemplatesFromLocalStorage() || [],

  draftTemplate: defaultdraftTemplate,
  activeTemplate: null,
  templateToView: null,
};
const templateSlice = createSlice({
  name: "templates",
  initialState,
  reducers: {
    // Initialize a new temporary template for creation
    createdraftTemplate(state) {
      const id = generateId();
      state.draftTemplate = {
        exercises: [],
        id,
        name: "",
      };
    },

    // Load an existing template into the temporary template for editing
    loaddraftTemplate(state, action: PayloadAction<string>) {
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
            ? found.exercises.map((e) => ({ ...e } as Exercise))
            : [],
        };
      } else {
        // Reset to default if template not found
        state.draftTemplate = defaultdraftTemplate;
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
      const { templateName: name, draftTemplate } = action.payload;
      const { exercises, id } = draftTemplate;

      state.templates.push({
        name,
        exercises,
        id,
      });

      // Clear the temporary template after saving
      state.draftTemplate = defaultdraftTemplate;
    },
    // Remove a template from the templates array
    deleteTemplate(state, action: PayloadAction<string>) {
      const templateId = action.payload;

      state.templates = state.templates.filter(
        (template) => template.id !== String(templateId)
      );
    },

    // Update an existing template with changes from the temporary template
    updateTemplate(state, action: PayloadAction<DraftTemplate>) {
      const templateIdToUpdate = state.draftTemplate.id;

      const index = state.templates.findIndex(
        (template) => template.id === templateIdToUpdate
      );

      if (index !== -1) {
        state.templates[index] = action.payload;
      }

      // Clear the temporary template after updating
      state.draftTemplate = defaultdraftTemplate;
    },

    // Add a new exercise to the temporary template
    addExerciseToTemplate(
      state,
      action: PayloadAction<Omit<Exercise, "id"> | Exercise>
    ) {
      const exercise = action.payload;
      const exerciseWithId =
        "id" in exercise ? exercise : { ...exercise, id: generateId() };
      state.draftTemplate.exercises.push(exerciseWithId);
    },

    addSetToExerciseInTemplate(
      state,
      action: PayloadAction<{ exerciseId: string; set: Set }>
    ) {
      const { exerciseId, set } = action.payload;

      const exercise = state.draftTemplate.exercises.find(
        (ex) => ex.id === exerciseId
      );

      if (exercise) exercise.sets.push(set);
    },
    // Remove an exercise from the temporary template
    removeExerciseFromTemplate(state, action: PayloadAction<string>) {
      const exerciseId = action.payload;

      state.draftTemplate.exercises = state.draftTemplate.exercises.filter(
        (exercise) => exercise.id !== exerciseId
      );
    },
    // Update an existing exercise in the temporary template
    editExerciseInTemplate(state, action: PayloadAction<Exercise>) {
      const { id, exerciseName, sets } = action.payload;

      const index = state.draftTemplate.exercises.findIndex(
        (exercise) => exercise.id === id
      );

      if (index !== -1) {
        const currentExercise = state.draftTemplate.exercises[index];

        if (currentExercise) {
          state.draftTemplate.exercises[index] = {
            id: currentExercise.id,
            exerciseName,
            sets,
          };
        }
      }
    },

    // Reorder exercises within the temporary template
    reorderExerciseInTemplate(
      state,
      action: PayloadAction<{ from: number; to: number }>
    ) {
      const { from, to } = action.payload;
      const list = state.draftTemplate.exercises;

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
        state.draftTemplate.exercises = copy;
      }
    },
    // Optionally update specifictemplate data with activeTemplate
    updateTemplateFromActive(
      state,
      action: PayloadAction<{ templateId: string; exercises: Exercise[] }>
    ) {
      const { templateId, exercises } = action.payload;

      const templateToModify = state.templates.findIndex(
        (template) => template.id === templateId
      );

      // Tell TS that this element will ALWAYS exist
      state.templates[templateToModify]!.exercises = exercises;
    },
  },
});

export const {
  addTemplate,
  editExerciseInTemplate,
  addExerciseToTemplate,
  createdraftTemplate,
  removeExerciseFromTemplate,
  deleteTemplate,
  editTemplateName,
  loaddraftTemplate,
  updateTemplate,
  reorderExerciseInTemplate,
  updateTemplateFromActive,
} = templateSlice.actions;

export default templateSlice.reducer;
