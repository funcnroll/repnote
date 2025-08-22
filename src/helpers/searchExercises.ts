import { ExerciseFromDB } from "@/types/ExerciseFromDB";

export function searchExercises(e: ExerciseFromDB, query: string) {
  const terms = query.toLowerCase().trim().split(" ");

  return terms.every(
    (term) =>
      e.name.toLowerCase().includes(term) ||
      e.primaryMuscles.some((muscle) => muscle.includes(term)) ||
      e.secondaryMuscles.some((muscle) => muscle.includes(term))
  );
}
