import homeReducer from "./homeSlice";
import templatesReducer, {
  addTemplate,
  updateTemplate,
  deleteTemplate,
} from "./templateSlice";
import errorReducer from "./errorSlice";
import { configureStore, createListenerMiddleware } from "@reduxjs/toolkit";
import { saveTemplatesToLocalStorage } from "./localStorage";

const listenerMiddleware = createListenerMiddleware();

export const store = configureStore({
  reducer: {
    home: homeReducer,
    templates: templatesReducer,
    error: errorReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().prepend(listenerMiddleware.middleware),
});

// Listen for all template changes and sync to localStorage
listenerMiddleware.startListening({
  actionCreator: addTemplate,
  effect: (action, listenerApi) => {
    const state = listenerApi.getState() as RootState;
    saveTemplatesToLocalStorage(state.templates.templates);
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
