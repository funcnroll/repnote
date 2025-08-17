import { Template } from "./templateSlice";

/**
 * Saves the current templates array to browser localStorage
 * Used for data persistence between browser sessions
 */
export const saveTemplatesToLocalStorage = (templates: Template[]) => {
  localStorage.setItem("templates", JSON.stringify(templates));
};

/**
 * Loads templates from browser localStorage on app initialization
 * Returns empty array if no saved data exists
 */
export const loadTemplatesFromLocalStorage = () => {
  const saved = localStorage.getItem("templates");
  return saved ? JSON.parse(saved) : [];
};
