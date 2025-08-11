import { createSlice } from "@reduxjs/toolkit";
import { generateId } from "../helpers/generateId";

const defaultTmpTemplate = {
  exercises: [],
  id: 0,
  name: "",
};

const initialState = {
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
const templatesSlice = createSlice({
  name: "templates",
  initialState,
  reducers: {
    createTmpTemplate: {
      reducer: (state, action) => {
        state.tmpTemplate = action.payload;
      },
      prepare: () => {
        const id = generateId();
        return {
          payload: {
            exercises: [],
            id: id,
          },
        };
      },
    },

    loadTmpTemplate(state, action) {
      const templateId = action.payload;

      const found = state.templates.find(
        (t) => String(t.id) === String(templateId)
      );

      if (found) {
        state.tmpTemplate = {
          id: found.id,
          name: found.name ?? "",
          exercises: found.exercises
            ? found.exercises.map((e) => ({ ...e }))
            : [],
        };
      } else {
        state.tmpTemplate = defaultTmpTemplate;
      }
    },

    editTemplateName(state, action) {
      state.tmpTemplate.name = action.payload;
    },
    addTemplate(state, action) {
      const { templateName: name, tmpTemplate } = action.payload;
      const { exercises, id } = tmpTemplate;

      state.templates.push({
        name,
        exercises,
        id,
      });

      state.tmpTemplate = defaultTmpTemplate;
    },
    deleteTemplate(state, action) {
      const templateId = action.payload;

      state.templates = state.templates.filter(
        (template) => template.id !== templateId
      );
    },
    updateTemplate(state, action) {
      const templateIdToUpdate = state.tmpTemplate.id;

      const index = state.templates.findIndex(
        (template) => template.id === templateIdToUpdate
      );

      if (index !== -1) {
        state.templates[index] = action.payload;
      }

      state.tmpTemplate = defaultTmpTemplate;
    },

    addExercise: {
      reducer: (state, action) => {
        state.tmpTemplate.exercises.push(action.payload);
      },
      prepare: ({
        exerciseName,
        sets,
        reps,
        setsDone = 0,
        exerciseId = null,
        isCustom = null,
      }) => {
        const id = generateId();
        return {
          payload: {
            id,
            exerciseName,
            sets,
            reps,
            setsDone,
            // used later for tracking and quick access
            exerciseId,
            isCustom,
          },
        };
      },
    },
    removeExercise(state, action) {
      const exerciseId = action.payload;

      state.tmpTemplate.exercises = state.tmpTemplate.exercises.filter(
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

      const index = state.tmpTemplate.exercises.findIndex(
        (exercise) => exercise.id === id
      );

      if (index !== -1) {
        state.tmpTemplate.exercises[index] = {
          ...state.tmpTemplate.exercises[index],
          exerciseName,
          sets,
          reps,
          exerciseId,
          isCustom,
        };
      }
    },

    reorderExercises(state, action) {
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

      const [moved] = copy.splice(from, 1);
      copy.splice(to, 0, moved);
      state.tmpTemplate.exercises = copy;
    },
  },
});

export const {
  addTemplate,
  editExercise,
  addExercise,
  createTmpTemplate,
  removeExercise,
  deleteTemplate,
  editTemplateName,
  loadTmpTemplate,
  updateTemplate,
} = templatesSlice.actions;

export default templatesSlice.reducer;
