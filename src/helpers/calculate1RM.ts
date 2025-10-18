export function calculate1RM(weight: number, reps: number): number {
  if (reps <= 1) {
    return weight; // actual 1RM if only 1 rep was performed
  }

  //Epley Formula
  return weight * (1 + 0.0333 * reps);
}
