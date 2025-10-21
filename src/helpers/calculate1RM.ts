export function calculate1RM(
  weight: number | null,
  reps: number | null
): number | null {
  if (weight === null || reps === null) {
    return null;
  }

  if (reps <= 1) {
    return weight; // actual 1RM if only 1 rep was performed
  }

  // Epley Formula
  return weight * (1 + 0.0333 * reps);
}
