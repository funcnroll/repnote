import homeReducer from "./homeSlice";
import templatesReducer from "./templatesSlice";
import { configureStore } from "@reduxjs/toolkit";

export const store = configureStore({
  reducer: {
    home: homeReducer,
    templates: templatesReducer,
  },
});
