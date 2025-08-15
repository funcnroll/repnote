import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { generateId } from "../helpers/generateId";

interface Exercise {
  id: string;
  exerciseName: string;
  sets: number;
  reps: number;
  setsDone?: number;

  //TODO: optional until commonExercises is finished
  exerciseId?: string | null;
  isCustom?: boolean | null;
}

export interface Template {
  id: string;
  name: string;
  exercises: Exercise[];
}

interface TmpTemplateObj {
  exercises: Exercise[];
  id: string;
  name: string;
}

interface State {
  templates: Template[];
  tmpTemplate: TmpTemplateObj;
  // TODO: Optional until starting a workout is finished
  isTemplateActive?: boolean;
  templateToView: Template | null;
}

const defaultTmpTemplate: TmpTemplateObj = {
  exercises: [],
  id: "",
  name: "",
};

const initialState: State = {
  // object to hold exercises for each template
  // example template object:
  // {
  //   name: 'Leg Day',
  //   exercises: [
  //     { name: 'Squats', sets: 4, reps: 10 },
  //     { name: 'Lunges', sets: 3, reps: 12 },
  //   ]
  //   id: 1
  // },
  templates: [],

  tmpTemplate: defaultTmpTemplate,
  isTemplateActive: false,
  templateToView: null,
};
const templateSlice = createSlice({
  name: "templates",
  initialState,
  reducers: {
    createTmpTemplate(state) {
      const id = generateId();
      state.tmpTemplate = {
        exercises: [],
        id,
        name: "",
      };
    },

    loadTmpTemplate(state, action: PayloadAction<string>) {
      const templateId = action.payload;

      const found = state.templates.find(
        (t) => String(t.id) === String(templateId)
      );

      // Load template into tmpTemplate
      if (found) {
        state.tmpTemplate = {
          id: found.id,
          name: found.name ?? "",
          exercises: found.exercises
            ? found.exercises.map((e) => ({ ...e } as Exercise))
            : [],
        };
      } else {
        state.tmpTemplate = defaultTmpTemplate;
      }
    },

    editTemplateName(state, action: PayloadAction<string>) {
      state.tmpTemplate.name = action.payload;
    },
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

      state.tmpTemplate = defaultTmpTemplate;
    },
    deleteTemplate(state, action: PayloadAction<string>) {
      const templateId = action.payload;

      state.templates = state.templates.filter(
        (template) => template.id !== String(templateId)
      );
    },
    updateTemplate(state, action: PayloadAction<TmpTemplateObj>) {
      const templateIdToUpdate = state.tmpTemplate.id;

      const index = state.templates.findIndex(
        (template) => template.id === templateIdToUpdate
      );

      if (index !== -1) {
        state.templates[index] = action.payload;
      }

      state.tmpTemplate = defaultTmpTemplate;
    },

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
    removeExerciseFromTemplate(state, action: PayloadAction<string>) {
      const exerciseId = action.payload;

      state.tmpTemplate.exercises = state.tmpTemplate.exercises.filter(
        (exercise) => exercise.id !== exerciseId
      );
    },
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

    reorderExerciseInTemplate(
      state,
      action: PayloadAction<{ from: number; to: number }>
    ) {
      const { from, to } = action.payload;
      const list = state.tmpTemplate.exercises;

      // just in case
      if (
        from === to ||
        from < 0 ||
        to < 0 ||
        from >= list.length ||
        to >= list.length
      )
        return;

      const copy = [...list];

      const movedArray = copy.splice(from, 1);
      const moved = movedArray[0];
      if (moved) {
        copy.splice(to, 0, moved);
        state.tmpTemplate.exercises = copy;
      }
    },
    startTemplate(state, action) {},
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
