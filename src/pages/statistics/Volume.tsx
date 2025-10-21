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
import {
  chartColors,
  labelStyle,
  tickStyleXAxis,
  tickStyleYAxis,
  legendStyle,
  gridStyle,
  barStyle,
} from "../../../chartColors";

function Volume() {
  const { weeksArr } = useStatisticsData();

  const weeklySetComparisonData = weeksArr.map((week, index) => {
    const completed = getWeeklyCompletedSetData(week);
    const total = week.reduce((acc, workout) => acc + workout.sets, 0);

    return {
      week: index + 1,
      completedSets: completed,
      missedSets: total - completed,
    };
  });

  const weeklyRepsData = weeksArr.map((week, index) => ({
    week: index + 1,
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
                    value="Sets"
                    position="insideLeft"
                    angle={-90}
                    offset={-5}
                  />
                </YAxis>
                <Bar
                  dataKey="completedSets"
                  fill={chartColors.blue}
                  name="Completed Sets"
                  stackId={1}
                  {...barStyle}
                />
                <Bar
                  dataKey="missedSets"
                  fill={chartColors.red}
                  name="Missed Sets"
                  stackId={1}
                  {...barStyle}
                />
                <Legend
                  height={48}
                  verticalAlign="top"
                  align="center"
                  iconType="circle"
                  wrapperStyle={legendStyle}
                />
              </BarChart>
            </ResponsiveContainer>
          </Chart>

          <Chart>
            <ResponsiveContainer
              width="100%"
              height="100%"
            >
              <LineChart
                data={weeklyRepsData}
                margin={{ top: 16, right: 16, left: 16, bottom: 32 }}
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
                  tickMargin={3}
                  tickSize={0}
                  tick={tickStyleYAxis}
                >
                  <Label
                    {...labelStyle}
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
                  wrapperStyle={legendStyle}
                />
              </LineChart>
            </ResponsiveContainer>
          </Chart>

          <Chart>
            <ResponsiveContainer
              width="100%"
              height="100%"
            >
              <LineChart
                data={weeklyWeightData}
                margin={{ top: 16, right: 16, left: 16, bottom: 32 }}
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
                  width={48}
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
                  dataKey="completedWeight"
                  dot={false}
                  type="monotone"
                  name="Completed Weight "
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
      </div>
    </div>
  );
}

export default Volume;
