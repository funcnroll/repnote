import ChevronBack from "@/components/reusable/ChevronBack";
import SearchExerciseCard from "@/components/reusable/SearchExerciseCard";
import exercisesRaw from "@/data/exercises.json";
import { useDebouncedValue } from "@/hooks/useDebouncedValue";
import { useStatisticsData } from "@/hooks/useStatisticsData";
import { searchExercises } from "@/services/exercises/searchExercises";
import { ExerciseFromDB } from "@/types/ExerciseFromDB";
import { useMemo, useState } from "react";
import SearchExercises from "../templates/reusable/search/SearchExercises";

function Performance() {
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

  console.log(selected);

  function getSelectedExerciseData(selectedExercise: string) {
    const query = selectedExercise.trim().toLowerCase();

    return weeksArr.map((week, i) => {
      const matches = week
        .flatMap((w) => w.exercises)
        .filter((ex) => ex.exerciseName.trim().toLowerCase() === query);

      return { week: i + 1, exercises: matches };
    });
  }

  console.log(selected ? getSelectedExerciseData(selected.name) : null);

  return (
    <div className="h-screen overflow-y-auto bg-backgroundColor text-textPrimary px-6 py-8 pb-24">
      <ChevronBack />

      <div className="mx-auto mt-10 max-w-4xl">
        <header className="mb-6">
          <h1 className="text-2xl font-semibold">Performance</h1>
          <p className="text-sm text-textSecondary">
            See how your strength evolves week by week with 1RM estimates and
            exercise trends.
          </p>
        </header>

        <div className="max-w-sm">
          <SearchExercises
            search={search}
            setSearch={setSearch}
          />
        </div>

        <div className="mt-4 space-y-2">
          {search.length > 0 &&
            results.map((e) => (
              <SearchExerciseCard
                key={e.id}
                e={e}
                func={exerciseToSelect}
              />
            ))}
        </div>

        {selected && (
          <div className="mt-6">
            <h2 className="text-lg font-semibold mb-2">
              Trends for: {selected.name}
            </h2>
          </div>
        )}
      </div>
    </div>
  );
}

export default Performance;
