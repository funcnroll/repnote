import { Template } from "./templateSlice";

import { CompletedWorkout } from "../types/CompletedWorkout";
import { ActiveTemplate } from "./activeTemplateSlice";

/**
 * Saves the current templates array to browser localStorage
 * Used for data persistence between browser sessions
 */
export function saveTemplatesToLocalStorage(templates: Template[]) {
  localStorage.setItem("templates", JSON.stringify(templates));
}

/**
 * Loads templates from browser localStorage on app initialization
 * Returns empty array if no saved data exists
 */
export function loadTemplatesFromLocalStorage() {
  const saved = localStorage.getItem("templates");
  return saved ? JSON.parse(saved) : [];
}

/**
 * Saves the user's name to browser localStorage
 * Used for data persistence between browser sessions
 */
export function saveNameToLocalStorage(name: string) {
  localStorage.setItem("name", JSON.stringify(name));
}

/**
 * Loads user's name from browser localStorage on app initialization
 * Returns empty string if no saved data exists
 */
export function loadNameFromLocalStorage() {
  const saved = localStorage.getItem("name");
  return saved ? JSON.parse(saved) : "";
}

/**
 * Saves the isCustom state for a specific exercise to localStorage
 * Used to remember custom exercise preference when editing
 */
export function saveIsCustomToLocalStorage(
  exerciseId: string,
  isCustom: boolean
) {
  const key = `isCustom_${exerciseId}`;
  localStorage.setItem(key, JSON.stringify(isCustom));
}

/**
 * Loads the isCustom state for a specific exercise from localStorage
 * Returns false if no saved data exists for this exercise
 */
export function loadIsCustomFromLocalStorage(exerciseId: string) {
  const key = `isCustom_${exerciseId}`;
  const saved = localStorage.getItem(key);
  return saved ? JSON.parse(saved) : false;
}

/**
 * Removes the isCustom state for a specific exercise from localStorage
 * Used when exercise is deleted or no longer needed
 */
export function removeIsCustomFromLocalStorage(exerciseId: string) {
  const key = `isCustom_${exerciseId}`;
  localStorage.removeItem(key);
}

/**
 * Saves a completed workout to the recent workouts array in localStorage
 * Used for data persistence between browser sessions
 */
export function saveFinishedWorkoutToLocalStorage(workout: CompletedWorkout) {
  const existingWorkouts = loadRecentWorkoutsFromLocalStorage();
  const updatedWorkouts = [workout, ...existingWorkouts];
  localStorage.setItem("recentWorkouts", JSON.stringify(updatedWorkouts));
}

/**
 * Loads recent workouts array from browser localStorage
 * Returns empty array if no saved data exists
 */
export function loadRecentWorkoutsFromLocalStorage(): CompletedWorkout[] {
  const saved = localStorage.getItem("recentWorkouts");
  return saved ? JSON.parse(saved) : [];
}

/**
 * Saves multiple completed workouts to localStorage for seeding purposes
 * Temporarily removes the 4-workout limit to allow bulk historical data
 */
export function seedWorkoutsToLocalStorage(workouts: CompletedWorkout[]) {
  // Sort workouts by timestamp (oldest first)
  const sortedWorkouts = workouts.sort(
    (a, b) => new Date(a.timestamp).getTime() - new Date(b.timestamp).getTime()
  );

  localStorage.setItem("recentWorkouts", JSON.stringify(sortedWorkouts));
}

/**
 * Saves the currently active workout template to localStorage
 * Used to persist in-progress workouts between browser sessions
 */
export function saveActiveTemplateToLocalStorage(
  activeTemplate: ActiveTemplate
) {
  localStorage.setItem("activeTemplate", JSON.stringify(activeTemplate));
}

/**
 * Loads the currently active workout template from localStorage
 * Returns null if no active template exists
 */
export function loadActiveTemplateFromLocalStorage(): ActiveTemplate | null {
  const saved = localStorage.getItem("activeTemplate");
  return saved ? JSON.parse(saved) : null;
}

/**
 * Deletes the active template from browser localStorage
 * Used when finishing or canceling a workout
 */
export function deleteActiveTemplateFromLocalStorage() {
  localStorage.removeItem("activeTemplate");
}
