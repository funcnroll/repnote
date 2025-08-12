export function saveWorkoutToLocalStorage(workout: {
  name: string;
  sets: number;
  timestamp: string;
}) {
  const STORAGE_KEY = "recentWorkouts";

  const workouts = JSON.parse(localStorage.getItem(STORAGE_KEY) || "[]") || [];

  workouts.unshift(workout);

  const trimmed = workouts.slice(0, 3); // keep only last 3

  localStorage.setItem(STORAGE_KEY, JSON.stringify(trimmed));
}

export function getRecentWorkouts() {
  const STORAGE_KEY = "recentWorkouts";
  return JSON.parse(localStorage.getItem(STORAGE_KEY) || "[]");
}
