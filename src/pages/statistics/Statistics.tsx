import { loadRecentWorkoutsFromLocalStorage } from "@/app/localStorage";
import StatCard from "../../components/reusable/StatisticCard";
import { differenceInCalendarWeeks } from "date-fns";

import { StatisticsWeeks } from "@/types/StatisticsWeeks";
import { Line, LineChart, ResponsiveContainer } from "recharts";
import { chartColors } from "../../../chartColors";

function Statistics() {
  const data = loadRecentWorkoutsFromLocalStorage();

  // Sort data ascending (oldest to newest)
  // Most likely redundant but just in case (as data by default is stored chronologically)
  const sortedData = data.sort(
    (a, b) => new Date(a.timestamp).getTime() - new Date(b.timestamp).getTime()
  );

  if (sortedData.length === 0)
    return (
      <div className="h-screen overflow-y-auto p-4 pb-24 text-textPrimary">
        <div className="max-w-4xl mx-auto">
          <div className="bg-cardColor p-6 rounded-xl">
            <h2 className="text-xl font-semibold mb-6 flex items-center gap-2">
              <div className="w-2 h-6 bg-blue rounded-full"></div>
              Progress Statistics
            </h2>
            <h3>
              Get started by preloading the sample data or simply experiment
              with your own workouts to see your progress take shape.
            </h3>
          </div>
        </div>
      </div>
    );

  const firstDate = new Date(sortedData[0]!?.timestamp);

  const weeks: StatisticsWeeks = {};

  // Create an array of total weeks between the first workout and last finished workout
  for (const workout of sortedData) {
    const day = new Date(workout.timestamp);

    // Get the number of weeks between the first workout and the current workout
    const weekIndex = differenceInCalendarWeeks(day, firstDate, {
      weekStartsOn: 1, // Monday
    });

    const weekNum = weekIndex + 1;

    // Create array if not there yet, then push
    (weeks[weekNum] ||= []).push(workout);
  }

  const weeksArr = Object.values(weeks);

  const weeklyPreviewSetData = weeksArr.map((week, index) => {
    return {
      value: week.reduce((acc, workout) => acc + workout.completedSets, 0),
      week: index + 1,
    };
  });

  const weeklyPreviewWeightData = weeksArr.map((week, index) => {
    // Grab the first exercise name of the first workout of the first week
    const defaultExercise =
      weeksArr?.[0]?.[0]?.exercises[0]?.exerciseName || null;

    // Find the exercise in all weeks
    const matchingSet = week.map((workout) => {
      return workout.exercises.filter(
        (ex) => ex.exerciseName === defaultExercise
      );
    });

    const weeklyPreviewmaxWeight = matchingSet
      .flatMap((ex) => ex.map((e) => e.sets.map((s) => s.weight)))
      .flat();

    // Ensure there are no nulls for type safety
    const nums = weeklyPreviewmaxWeight.filter((n): n is number => n !== null);

    // If no number is present, return null (recharts can handle it)
    const maxWeight =
      weeklyPreviewmaxWeight.length > 0 ? Math.max(...nums) : null;

    return {
      value: maxWeight,
      week: index + 1,
    };
  });

  const weeklyPreviewConsistencyData = "";

  return (
    <div className="h-screen overflow-y-auto p-4 pb-24 text-textPrimary">
      <div className="max-w-4xl mx-auto">
        <div className="bg-cardColor p-6 rounded-xl">
          <h2 className="text-xl font-semibold mb-6 flex items-center gap-2">
            <div className="w-2 h-6 bg-blue rounded-full"></div>
            Progress Statistics
          </h2>

          <div className="space-y-4">
            <StatCard
              title="Volume"
              subtitle="Sets, reps, and weight moved"
              statistic={
                <ResponsiveContainer
                  width="100%"
                  height="100%"
                >
                  <LineChart data={weeklyPreviewSetData}>
                    <Line
                      type="monotone"
                      dataKey="value"
                      stroke={chartColors.blue}
                      strokeWidth={1.5}
                      dot={false}
                    />
                  </LineChart>
                </ResponsiveContainer>
              }
              onClick={() =>
                console.log("Navigate to Workout Frequency details")
              }
            />

            <StatCard
              title="Performance"
              subtitle="Personal records & best lifts"
              statistic={
                <ResponsiveContainer
                  width="100%"
                  height="100%"
                >
                  <LineChart data={weeklyPreviewWeightData}>
                    <Line
                      type="monotone"
                      dataKey="value"
                      stroke={chartColors.blue}
                      strokeWidth={1.5}
                      dot={false}
                      connectNulls
                      strokeLinecap="round"
                    />
                  </LineChart>
                </ResponsiveContainer>
              }
              onClick={() => console.log("Navigate to Performance details")}
            />

            <StatCard
              title="Consistency"
              subtitle="Your training patterns"
              statistic="3/2/1"
              onClick={() =>
                console.log("Navigate to Template Breakdown details")
              }
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Statistics;
