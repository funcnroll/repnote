import { ExerciseFromDB } from "@/types/ExerciseFromDB";
import exercisesRaw from "@/data/exercises.json";

const exercises: ExerciseFromDB[] = exercisesRaw as ExerciseFromDB[];

export function getAllMuscleGroups(): string[] {
  const all = new Set<string>();

  exercises.forEach((e) => {
    e.primaryMuscles.forEach((muscle) => all.add(muscle));
    e.secondaryMuscles.forEach((muscle) => all.add(muscle));
  });

  return Array.from(all).sort();
}
