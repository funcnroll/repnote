import { CompletedWorkout } from "@/types/CompletedWorkout";

export function getWeeklyCompletedSetData(week: CompletedWorkout[]): number {
  return week.reduce((acc, workout) => acc + workout.completedSets, 0);
}
