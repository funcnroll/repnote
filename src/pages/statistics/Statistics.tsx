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
  for (const week of sortedData) {
    const day = new Date(week.timestamp);
    const weekIndex = differenceInCalendarWeeks(day, firstDate, {
      // Week starts on monday
      weekStartsOn: 1,
    });
    const weekNum = weekIndex + 1; // Week numbers start at 1, not 0 (Array starts at [1], not [0])

    if (!weeks[weekNum]) weeks[weekNum] = [];
    weeks[weekNum].push(week);
  }

  const weeklySetData = Object.values(weeks).map((week, index) => {
    return {
      value: week.reduce((acc, workout) => acc + workout.completedSets, 0),
      week: index + 1,
    };
  });

  console.log(Object.values(weeks));

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
                  <LineChart data={weeklySetData}>
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
              statistic="+15%"
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
