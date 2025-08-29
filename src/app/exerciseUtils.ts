import { generateId } from "@/helpers/generateId";
import { Exercise } from "@/types/Exercise";
import { Set } from "@/types/Set";

export const exerciseUtils = {
  ensureHasId(exercise: Exercise | Omit<Exercise, "id">): Exercise {
    const exerciseWithId =
      "id" in exercise ? exercise : { ...exercise, id: generateId() };

    return exerciseWithId;
  },

  find(id: string, exercises: Exercise[]) {
    const foundExercise = exercises.find((ex) => ex.id === id);

    return foundExercise;
  },

  filterOut(id: string, exercises: Exercise[]) {
    const filteredExercises = exercises.filter(
      (exercise) => exercise.id !== id
    );

    return filteredExercises;
  },

  edit(id: string, exerciseName: string, sets: Set[], exercises: Exercise[]) {
    const index = exercises.findIndex((exercise) => exercise.id === id);

    if (index !== -1) {
      const currentExercise = exercises[index];

      if (currentExercise) {
        return exercises.map((exercise, i) =>
          i === index
            ? { id: currentExercise.id, exerciseName, sets }
            : exercise
        );
      }
    }

    return exercises;
  },

  reorder(from: number, to: number, exercises: Exercise[]) {
    const list = exercises;

    if (
      from === to ||
      from < 0 ||
      to < 0 ||
      from >= list.length ||
      to >= list.length
    )
      return exercises;

    const copy = [...list];

    const movedArray = copy.splice(from, 1);
    const moved = movedArray[0];
    if (moved) {
      copy.splice(to, 0, moved);

      return copy;
    }

    return exercises;
  },
};
