import ChevronBack from "@/components/reusable/ChevronBack";
import Chart from "./Chart";
import { useStatisticsData } from "@/hooks/useStatisticsData";
import {
  Bar,
  BarChart,
  CartesianGrid,
  Label,
  Legend,
  Line,
  LineChart,
  PolarAngleAxis,
  PolarGrid,
  Radar,
  RadarChart,
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
import { useVolumeData } from "@/hooks/useVolumeData";

function Volume() {
  // TODO: Remove comparison between completed sets and missed sets; move missed sets to Consistency and keep volume focused on completed sets

  // const weeklySetComparisonData = weeksArr.map((week, index) => {
  //   const completed = getWeeklyCompletedSetData(week);
  //   const total = week.reduce((acc, workout) => acc + workout.sets, 0);

  //   return {
  //     week: index + 1,
  //     completedSets: completed,
  //     missedSets: total - completed,
  //   };
  // });

  const { weeklySetsData, weeklyRepsData, weeklyWeightData, radarData } =
    useVolumeData();

  return (
    <div className="h-screen px-6 py-8 pb-24 overflow-y-auto bg-backgroundColor text-textPrimary">
      <ChevronBack />

      <div className="max-w-4xl mx-auto mt-10">
        <header className="mb-6">
          <h1 className="text-2xl font-semibold">Training volume</h1>
          <p className="text-sm text-textSecondary">
            Total work performed each week, measured by sets, reps, and weight
            lifted.
          </p>
        </header>

        <div className="flex flex-wrap justify-center gap-4">
          <Chart>
            <ResponsiveContainer
              width="100%"
              height="100%"
            >
              <RadarChart
                data={radarData}
                outerRadius="75%"
              >
                <PolarGrid
                  stroke="#444"
                  strokeDasharray="0 0"
                />
                <PolarAngleAxis
                  dataKey="category"
                  tick={{
                    fill: "#aaa",
                    fontSize: 12.5,
                    fontWeight: 500,
                  }}
                />
                <Radar
                  dataKey="sets"
                  stroke={chartColors.blue}
                  fill={chartColors.blue}
                  fillOpacity={0.4}
                  strokeWidth={2}
                />
              </RadarChart>
            </ResponsiveContainer>
          </Chart>

          <Chart>
            <ResponsiveContainer
              width="100%"
              height="100%"
            >
              <BarChart
                data={weeklySetsData}
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
                  name="Completed Weight"
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
