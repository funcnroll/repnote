import ChevronBack from "@/components/reusable/ChevronBack";
import SearchExerciseCard from "@/components/reusable/SearchExerciseCard";
import exercisesRaw from "@/data/exercises.json";
import { useDebouncedValue } from "@/hooks/useDebouncedValue";
import { useStatisticsData } from "@/hooks/useStatisticsData";
import { searchExercises } from "@/services/exercises/searchExercises";
import { ExerciseFromDB } from "@/types/ExerciseFromDB";
import { useMemo, useState } from "react";
import SearchExercises from "../templates/reusable/search/SearchExercises";
import { calculate1RM } from "@/helpers/calculate1RM";
import Chart from "./Chart";
import {
  CartesianGrid,
  Label,
  Legend,
  Line,
  LineChart,
  ResponsiveContainer,
  XAxis,
  YAxis,
} from "recharts";
import {
  labelStyle,
  tickStyleXAxis,
  tickStyleYAxis,
  legendStyle,
  gridStyle,
} from "../../../chartColors";

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

      {selected && (
        <div className="flex flex-wrap gap-4 justify-center mt-8">
          <Chart>
            <ResponsiveContainer
              width="100%"
              height="100%"
            >
              <LineChart
                data={weeklyOneRMEstimates}
                margin={{ top: 16, right: 20, left: 20, bottom: 32 }}
              >
                <CartesianGrid {...gridStyle} />
                <XAxis
                  dataKey="week"
                  tickMargin={8}
                  padding={{ left: 12, right: 12 }}
                  tickFormatter={(v) => (v % 2 === 0 ? v : "")}
                  tick={tickStyleXAxis}
                >
                  <Label
                    {...labelStyle}
                    value="Weeks"
                    position="insideBottom"
                    offset={-15}
                  />
                </XAxis>
                <YAxis
                  width={36}
                  tickMargin={6}
                  tickSize={0}
                  tick={tickStyleYAxis}
                >
                  <Label
                    {...labelStyle}
                    value="kg"
                    position="insideLeft"
                    angle={-90}
                    offset={-5}
                  />
                </YAxis>
                <Line
                  dataKey="estimated1RM"
                  dot={false}
                  type="monotone"
                  name="Estimated 1RM"
                  connectNulls
                />
                <Legend
                  height={48}
                  verticalAlign="top"
                  align="center"
                  iconType="circle"
                  wrapperStyle={legendStyle}
                />
              </LineChart>
            </ResponsiveContainer>
          </Chart>
        </div>
      )}
    </div>
  );
}

export default Performance;
