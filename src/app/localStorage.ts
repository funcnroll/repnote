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

/**
 * Saves the user's name to browser localStorage
 * Used for data persistence between browser sessions
 */
export const saveNameToLocalStorage = (name: string) => {
  localStorage.setItem("name", JSON.stringify(name));
};

/**
 * Loads user's name from browser localStorage on app initialization
 * Returns empty string if no saved data exists
 */
export const loadNameFromLocalStorage = (): string => {
  const saved = localStorage.getItem("name");
  return saved ? JSON.parse(saved) : "";
};

/**
 * Saves the isCustom state for a specific exercise to localStorage
 * Used to remember custom exercise preference when editing
 */
export const saveIsCustomToLocalStorage = (exerciseId: string, isCustom: boolean) => {
  const key = `isCustom_${exerciseId}`;
  localStorage.setItem(key, JSON.stringify(isCustom));
};

/**
 * Loads the isCustom state for a specific exercise from localStorage
 * Returns false if no saved data exists for this exercise
 */
export const loadIsCustomFromLocalStorage = (exerciseId: string): boolean => {
  const key = `isCustom_${exerciseId}`;
  const saved = localStorage.getItem(key);
  return saved ? JSON.parse(saved) : false;
};

/**
 * Removes the isCustom state for a specific exercise from localStorage
 * Used when exercise is deleted or no longer needed
 */
export const removeIsCustomFromLocalStorage = (exerciseId: string) => {
  const key = `isCustom_${exerciseId}`;
  localStorage.removeItem(key);
};
