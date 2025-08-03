export function saveWorkoutToLocalStorage(workout) {
  // workout in the following format:
  //   {
  //     name: "workout name",
  //       sets: 5,
  //       timestamp: "2023-10-01T12:00:00Z",
  // }

  const workouts = JSON.parse(localStorage.getItem("lastWorkouts")) || [];

  workouts.unshift(workout);

  const trimmed = workouts.slice(0, 3); // only last 3 workouts should be displayed

  localStorage.setItem("worlastWorkoutskouts", JSON.stringify(trimmed));
}

export function getRecentWorkouts() {
  return JSON.parse(localStorage.getItem("recentWorkouts"));
}
