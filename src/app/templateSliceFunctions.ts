import { generateId } from "@/helpers/generateId";
import { Exercise } from "@/types/Exercise";
import { Set } from "@/types/Set";

export const templateSliceFunctions = {
  EnsureExerciseHasId(exercise: Exercise | Omit<Exercise, "id">): Exercise {
    const exerciseWithId =
      "id" in exercise ? exercise : { ...exercise, id: generateId() };

    return exerciseWithId;
  },
  findExercise(id: string, exerciseArr: Exercise[]) {
    const foundExercise = exerciseArr.find((ex) => ex.id === id);

    return foundExercise;
  },

  filterExerciseOut(id: string, exerciseArr: Exercise[]) {
    const filteredExercise = exerciseArr.filter(
      (exercise) => exercise.id !== id
    );

    return filteredExercise;
  },

  editExercise(
    id: string,
    exerciseName: string,
    sets: Set[],
    exerciseArr: Exercise[]
  ) {
    const index = exerciseArr.findIndex((exercise) => exercise.id === id);

    if (index !== -1) {
      const currentExercise = exerciseArr[index];

      if (currentExercise) {
        exerciseArr[index] = {
          id: currentExercise.id,
          exerciseName,
          sets,
        };
      }
    }
  },
  reorderExercises(from: number, to: number, exerciseArr: Exercise[]) {
    const list = exerciseArr;

    // Validate indices to prevent array manipulation errors
    if (
      from === to ||
      from < 0 ||
      to < 0 ||
      from >= list.length ||
      to >= list.length
    )
      return exerciseArr;

    const copy = [...list];

    // Move exercise from 'from' index to 'to' index
    const movedArray = copy.splice(from, 1);
    const moved = movedArray[0];
    if (moved) {
      copy.splice(to, 0, moved);

      return copy;
    }

    return exerciseArr;
  },
};
