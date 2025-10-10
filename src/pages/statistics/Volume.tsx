import ChevronBack from "@/components/reusable/ChevronBack";
import Chart from "./Chart";
import { useStatisticsData } from "@/hooks/useStatisticsData";
import { getWeeklyCompletedSetData } from "@/helpers/getWeeklyCompletedSetData";
import {
  Bar,
  BarChart,
  CartesianGrid,
  Label,
  Legend,
  Line,
  LineChart,
  ResponsiveContainer,
  XAxis,
  YAxis,
} from "recharts";
import { chartColors } from "../../../chartColors";

function Volume() {
  const { weeksArr } = useStatisticsData();

  const weeklySetComparisonData = weeksArr.map((week, index) => {
    const completed = getWeeklyCompletedSetData(week);
    const total = week.reduce((acc, workout) => acc + workout.sets, 0);

    return {
      week: index + 1, // Week number starting from 1
      completedSets: completed,
      missedSets: total - completed,
    };
  });

  const weeklyRepsData = weeksArr.map((week, index) => ({
    week: index + 1,
    // Accumulate actualReps from all sets in all exercises in all workouts of the week
    // Not the prettiest but it works
    completedReps: week.reduce(
      (acc, workout) =>
        acc +
        workout.exercises.reduce(
          (exAcc, ex) =>
            exAcc +
            ex.sets.reduce((setAcc, set) => setAcc + (set.actualReps || 0), 0),
          0
        ),
      0
    ),
  }));

  const weeklyWeightData = weeksArr.map((week, index) => ({
    week: index + 1,
    // Accumulate weight from all sets in all exercises in all workouts of the week
    completedWeight: Math.round(
      week.reduce(
        (acc, workout) =>
          acc +
          workout.exercises.reduce(
            (exAcc, ex) =>
              exAcc +
              ex.sets.reduce((setAcc, set) => setAcc + (set.weight || 0), 0),
            0
          ),
        0
      )
    ),
  }));

  console.log(weeklyWeightData);

  return (
    <div className="h-screen overflow-y-auto bg-backgroundColor text-textPrimary px-6 py-8 pb-24">
      <ChevronBack />

      <div className="mx-auto mt-10 max-w-4xl">
        <header className="mb-6">
          <h1 className="text-2xl font-semibold">Training volume</h1>
          <p className="text-sm text-textSecondary">
            Total work performed each week, measured by sets, reps, and weight
            lifted.
          </p>
        </header>

        <div className="flex flex-wrap gap-4 justify-center">
          <Chart>
            <div className="flex items-center justify-center w-full h-full">
              <ResponsiveContainer
                width="100%"
                height="100%"
              >
                <BarChart
                  data={weeklySetComparisonData}
                  margin={{ top: 16, right: 16, left: 16, bottom: 32 }}
                  barCategoryGap="40%"
                  barGap={1.5}
                  barSize={7}
                >
                  <CartesianGrid
                    stroke="#374151"
                    strokeDasharray="0"
                    vertical={false}
                  />
                  <XAxis
                    dataKey="week"
                    tickMargin={8}
                    padding={{ left: 12, right: 12 }}
                    tickFormatter={(v) => (v % 2 === 0 ? v : "")}
                    tick={{ fontSize: 14 }}
                  >
                    <Label
                      value="Weeks"
                      position={"insideBottom"}
                      offset={-15}
                    />
                  </XAxis>

                  <YAxis
                    width={36}
                    tickMargin={6}
                    tickSize={0}
                    tick={{ fontSize: 14 }}
                  >
                    <Label
                      value="Sets"
                      position={"insideLeft"}
                      angle={-90}
                      offset={-5}
                    />
                  </YAxis>

                  <Bar
                    dataKey="completedSets"
                    fill={chartColors.blue}
                    name="Completed Sets"
                    stackId={1}
                  />
                  <Bar
                    dataKey="missedSets"
                    fill={chartColors.red}
                    name="Missed Sets"
                    stackId={1}
                  />

                  <Legend
                    height={48}
                    verticalAlign="top"
                    align="center"
                    iconType="circle"
                  />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </Chart>
          <Chart>
            <div className="flex items-center justify-center w-full h-full">
              <ResponsiveContainer
                width="100%"
                height="100%"
              >
                <LineChart
                  data={weeklyRepsData}
                  margin={{ top: 16, right: 16, left: 16, bottom: 32 }}
                >
                  <CartesianGrid
                    stroke="#374151"
                    strokeDasharray="0"
                    vertical={false}
                  />
                  <XAxis
                    dataKey="week"
                    tickMargin={8}
                    padding={{ left: 12, right: 12 }}
                    tickFormatter={(v) => (v % 2 === 0 ? v : "")}
                    tick={{ fontSize: 14 }}
                  >
                    <Label
                      value="Weeks"
                      position="insideBottom"
                      offset={-15}
                    />
                  </XAxis>
                  <YAxis
                    width={36}
                    tickMargin={6}
                    tickSize={0}
                    tick={{ fontSize: 14 }}
                  >
                    <Label
                      value="Reps"
                      position="insideLeft"
                      angle={-90}
                      offset={-5}
                    />
                  </YAxis>
                  <Line
                    dataKey="completedReps"
                    dot={false}
                    type="monotone"
                    name="Completed Reps"
                  />
                  <Legend
                    height={48}
                    verticalAlign="top"
                    align="center"
                    iconType="circle"
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </Chart>
          <Chart>
            <div className="flex items-center justify-center w-full h-full">
              <ResponsiveContainer
                width="100%"
                height="100%"
              >
                <LineChart
                  data={weeklyWeightData}
                  margin={{ top: 16, right: 16, left: 16, bottom: 32 }}
                >
                  <CartesianGrid
                    stroke="#374151"
                    strokeDasharray="0"
                    vertical={false}
                  />

                  <XAxis
                    dataKey="week"
                    tickMargin={8}
                    padding={{ left: 12, right: 12 }}
                    tickFormatter={(v) => (v % 2 === 0 ? v : "")}
                    tick={{ fontSize: 14 }}
                  >
                    <Label
                      value="Weeks"
                      position="insideBottom"
                      offset={-15}
                    />
                  </XAxis>

                  <YAxis
                    width={48}
                    tickMargin={6}
                    tickSize={0}
                    tick={{ fontSize: 14 }}
                  >
                    <Label
                      value="Weight"
                      position="insideLeft"
                      angle={-90}
                      offset={-5}
                    />
                  </YAxis>

                  <Line
                    dataKey="completedWeight"
                    dot={false}
                    type="monotone"
                    name="Completed Weight"
                  />

                  <Legend
                    height={48}
                    verticalAlign="top"
                    align="center"
                    iconType="circle"
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </Chart>
        </div>
      </div>
    </div>
  );
}

export default Volume;
