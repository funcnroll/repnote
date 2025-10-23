import { calculate1RM } from "@/helpers/calculate1RM";
import { useMemo, useState } from "react";
import { useStatisticsData } from "./useStatisticsData";
import exercisesRaw from "@/data/exercises.json";
import { ExerciseFromDB } from "@/types/ExerciseFromDB";
import { useDebouncedValue } from "./useDebouncedValue";
import { searchExercises } from "@/services/exercises/searchExercises";

export function usePerformanceData() {
  const exercises: ExerciseFromDB[] = exercisesRaw as ExerciseFromDB[];
  const { weeksArr } = useStatisticsData();

  const exerciseNames = useMemo(
    () =>
      weeksArr.flatMap((week) =>
        week.flatMap((workout) =>
          workout.exercises.map((ex) => ex.exerciseName)
        )
      ),
    [weeksArr]
  );

  const uniqueExercises = useMemo(
    () => [...new Set(exerciseNames)],
    [exerciseNames]
  );

  const exerciseObjectsFromDB = useMemo(
    () => exercises.filter((e) => uniqueExercises.includes(e.name)),
    [exercises, uniqueExercises]
  );

  const [search, setSearch] = useState("");
  const debouncedSearch = useDebouncedValue(search, 150);

  const [selected, setSelected] = useState<ExerciseFromDB | null>(null);

  function exerciseToSelect(ex: ExerciseFromDB) {
    setSelected(ex);
    setSearch("");
  }

  const results =
    search.length > 0
      ? exerciseObjectsFromDB.filter((e) => searchExercises(e, debouncedSearch))
      : [];

  function getSelectedExerciseSets(selectedExercise: string) {
    const query = selectedExercise.trim().toLowerCase();

    return weeksArr.map((week, i) => {
      const sets = week
        .flatMap((workout) => workout.exercises)
        .filter((ex) => ex.exerciseName.trim().toLowerCase() === query)
        .flatMap((ex) => ex.sets);

      return { week: i + 1, sets };
    });
  }

  const weeklyMaxWeight = getSelectedExerciseSets(
    selected ? selected.name : ""
  ).map((week) =>
    week.sets.length > 0
      ? Math.max(...week.sets.map((set) => set.weight!))
      : null
  );

  const weeklyMaxReps = getSelectedExerciseSets(
    selected ? selected.name : ""
  ).map((week) =>
    week.sets.length > 0
      ? Math.max(...week.sets.map((set) => set.actualReps!))
      : null
  );

  const weeklyOneRMEstimates = weeklyMaxWeight.map((weight, index) => {
    const reps = weeklyMaxReps[index];
    const estimate = calculate1RM(weight ?? null, reps ?? null);

    return {
      week: index + 1,
      estimated1RM: estimate != null ? Math.round(estimate) : null,
    };
  });

  const weeklyVolumeLoad = getSelectedExerciseSets(
    selected ? selected.name : ""
  ).map((week) => {
    const totalVolume = week.sets.reduce((acc, set) => {
      if (set.weight != null && set.actualReps != null) {
        return acc + set.weight * set.actualReps;
      }
      return acc;
    }, 0);

    return { week: week.week, volume: totalVolume === 0 ? null : totalVolume };
  });

  return {
    search,
    setSearch,
    results,
    selected,
    setSelected,
    exerciseToSelect,
    weeklyVolumeLoad,
    weeklyOneRMEstimates,
  };
}
