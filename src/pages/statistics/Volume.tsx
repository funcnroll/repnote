import ChevronBack from "@/components/reusable/ChevronBack";
import VolumeChart from "./VolumeChart";
import { useStatisticsData } from "@/hooks/useStatisticsData";
import { getWeeklyCompletedSetData } from "@/helpers/getWeeklyCompletedSetData";
import {
  Bar,
  BarChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { chartColors } from "../../../chartColors";

function Volume() {
  const { weeksArr } = useStatisticsData();

  console.log(weeksArr);

  const setComparisonData = weeksArr.map((week, index) => ({
    week: index + 1, // Week number starting from 1
    completedSets: getWeeklyCompletedSetData(week),
    totalSets: week.reduce((acc, workout) => acc + workout.sets, 0),
  }));

  console.log(setComparisonData);

  return (
    <div className="h-screen overflow-y-auto bg-backgroundColor text-textPrimary px-6 py-8 pb-24">
      <ChevronBack label="Statistics" />

      <div className="mx-auto mt-10 max-w-4xl">
        <header className="mb-6">
          <h1 className="text-2xl font-semibold">Training volume</h1>
          <p className="text-sm text-textSecondary">
            Total work performed each week, measured by sets, reps, and weight
            lifted.
          </p>
        </header>

        <div className="flex flex-wrap gap-4">
          <VolumeChart subtitle="Completed Sets (green) vs Actual Sets (Blue">
            <div className="flex items-center justify-center w-full h-full">
              <ResponsiveContainer
                width="90%"
                height="100%"
              >
                <BarChart data={setComparisonData}>
                  <CartesianGrid
                    stroke="#374151"
                    strokeDasharray="0"
                    vertical={false}
                  />
                  <XAxis dataKey="week" />
                  <YAxis />
                  <Tooltip />
                  <Bar
                    dataKey="completedSets"
                    fill={chartColors.green}
                    name="Completed Sets"
                  />
                  <Bar
                    dataKey="totalSets"
                    fill={chartColors.blue}
                    name="Total Sets"
                  />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </VolumeChart>
        </div>
      </div>
    </div>
  );
}

export default Volume;
