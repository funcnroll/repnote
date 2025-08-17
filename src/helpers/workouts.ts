import { CompletedWorkout } from "@/types/workout";

const KEY = "recentWorkouts";

/**
 * Saves a completed workout to localStorage and maintains a history of recent workouts
 * Only keeps the 3 most recent workouts to prevent storage bloat
 * @param workout Object containing workout name, sets completed, and timestamp
 */
export function saveWorkoutToLocalStorage(workout: CompletedWorkout) {
  // Load existing workouts or start with empty array
  const workouts = JSON.parse(localStorage.getItem(KEY) || "[]") || [];

  // Add new workout to the beginning of the array
  workouts.unshift(workout);

  // Keep only the 3 most recent workouts
  const trimmed = workouts.slice(0, 3);

  localStorage.setItem(KEY, JSON.stringify(trimmed));
}

/**
 * Retrieves the list of recent workouts from localStorage
 * @returns Array of recent workout objects, empty array if none exist
 */
export function getRecentWorkouts(): CompletedWorkout[] {
  return JSON.parse(localStorage.getItem(KEY) || "[]");
}
