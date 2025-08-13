import homeReducer from "./homeSlice";
import templatesReducer from "./templateSlice";
import errorReducer from "./errorSlice";
import { configureStore } from "@reduxjs/toolkit";

export const store = configureStore({
  reducer: {
    home: homeReducer,
    templates: templatesReducer,
    error: errorReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
