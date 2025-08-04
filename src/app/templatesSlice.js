import { createSlice } from "@reduxjs/toolkit";
import { generateId } from "../helpers/generateId";

const initialState = {
  // object to hold exercises for each template
  // example template object:
  // {
  //   templateName: 'Leg Day',
  //   exercises: [
  //     { name: 'Squats', sets: 4, reps: 10 },
  //     { name: 'Lunges', sets: 3, reps: 12 },
  //   ]
  //   id: 1
  // },
  templates: [],
  tmpTemplate: {
    exercises: [],
    id: 0,
  },

  templateXExercises: [],
  // for home screen to know if a template is active
  isTemplateActive: false,
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

    addTemplate(state, action) {},

    addExercise: {
      reducer: (state, action) => {
        state.tmpTemplate.exercises.push(action.payload);
        console.log(JSON.parse(JSON.stringify(state.tmpTemplate)));
      },
      prepare: ({ exerciseName, sets, reps, setsDone = 0 }) => {
        const id = generateId();
        return {
          payload: {
            id,
            exerciseName,
            sets,
            reps,
            setsDone,
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
  },
});

export const { addTemplate, addExercise, createTmpTemplate, removeExercise } =
  templatesSlice.actions;

export default templatesSlice.reducer;
