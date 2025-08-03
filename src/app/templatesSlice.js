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
  // array to hold template names
  templateNames: "",

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
        state.tmpTemplate = {
          ...state.tmpTemplate,
          id: action.payload.id,
        };
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
    addExercise(state, action) {
      // action structure:
      // {
      // exerciseName,
      // sets,
      // reps;
      //  setsDone
      // }
      state.tmpTemplate.exercises.push(action.payload);
    },
  },
});

export const { addTemplate, addExercise, createTmpTemplate } =
  templatesSlice.actions;

export default templatesSlice.reducer;
