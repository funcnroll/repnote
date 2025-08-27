import { ActiveTemplate } from "@/app/activeTemplateSlice";

/**
 * Calculates the total number of sets in a workout template
 */
export function calculateTotalSets(activeTemplate: ActiveTemplate | null): number {
  return activeTemplate?.exercises.reduce((sum, ex) => sum + ex.sets.length, 0) || 0;
}

/**
 * Calculates the number of completed sets in a workout template
 */
export function calculateCompletedSets(activeTemplate: ActiveTemplate | null): number {
  return activeTemplate?.exercises.reduce(
    (sum, ex) => sum + ex.sets.filter((set) => set.completed).length,
    0
  ) || 0;
}

/**
 * Calculates the workout progress percentage (0-100)
 */
export function calculateWorkoutProgress(activeTemplate: ActiveTemplate | null): number {
  const totalSets = calculateTotalSets(activeTemplate);
  const completedSets = calculateCompletedSets(activeTemplate);
  return totalSets > 0 ? Math.round((completedSets / totalSets) * 100) : 0;
}