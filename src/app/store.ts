import homeReducer from "./homeSlice";
import templatesReducer, {
  addTemplate,
  updateTemplate,
  deleteTemplate,
} from "./templateSlice";
import errorReducer from "./errorSlice";
import { configureStore, createListenerMiddleware } from "@reduxjs/toolkit";
import {
  saveTemplatesToLocalStorage,
  saveNameToLocalStorage,
} from "./localStorage";
import { changeName } from "./homeSlice";

// Create middleware to listen for specific Redux actions and trigger side effects
const listenerMiddleware = createListenerMiddleware();

// Configure the Redux store with all reducers and middleware
export const store = configureStore({
  reducer: {
    home: homeReducer, // User profile and workout status
    templates: templatesReducer, // Workout templates and exercises
    error: errorReducer, // Error messages for form validation
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().prepend(listenerMiddleware.middleware),
});

// Auto-save templates to localStorage whenever they are modified
// This ensures data persistence without manual save actions

listenerMiddleware.startListening({
  actionCreator: addTemplate,
  effect: (action, listenerApi) => {
    const state = listenerApi.getState() as RootState;
    saveTemplatesToLocalStorage(state.templates.templates);
  },
});

listenerMiddleware.startListening({
  actionCreator: updateTemplate,
  effect: (action, listenerApi) => {
    const state = listenerApi.getState() as RootState;
    saveTemplatesToLocalStorage(state.templates.templates);
  },
});

listenerMiddleware.startListening({
  actionCreator: deleteTemplate,
  effect: (action, listenerApi) => {
    const state = listenerApi.getState() as RootState;
    saveTemplatesToLocalStorage(state.templates.templates);
  },
});

// Auto-save name to localStorage whenever it is changed
// This ensures user's name persists between browser sessions
listenerMiddleware.startListening({
  actionCreator: changeName,
  effect: (action, listenerApi) => {
    const state = listenerApi.getState() as RootState;
    saveNameToLocalStorage(state.home.name);
  },
});

// Type definitions for TypeScript integration with Redux
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
