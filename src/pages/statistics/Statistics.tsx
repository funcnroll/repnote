import StatCard from "../../components/reusable/StatisticCard";

import { Line, LineChart, ResponsiveContainer } from "recharts";
import { chartColors } from "../../../chartStyles";
import { useNavigate } from "react-router";
import { useStatisticsData } from "@/hooks/useStatisticsData";

function Statistics() {
  const navigate = useNavigate();

  const {
    sortedData,
    weeklyPreviewConsistencyData,
    weeklyPreviewSetData,
    weeklyPreviewWeightData,
  } = useStatisticsData();

  if (sortedData.length === 0)
    return (
      <div className="h-screen p-4 pb-24 overflow-y-auto text-textPrimary">
        <div className="max-w-4xl mx-auto">
          <div className="p-6 bg-cardColor rounded-xl">
            <h2 className="flex items-center gap-2 mb-6 text-xl font-semibold">
              <div className="w-2 h-6 rounded-full bg-blue"></div>
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

  return (
    <div className="h-screen p-4 pb-24 overflow-y-auto text-textPrimary">
      <div className="max-w-4xl mx-auto">
        <div className="p-6 bg-cardColor rounded-xl">
          <h2 className="flex items-center gap-2 mb-6 text-xl font-semibold">
            <div className="w-2 h-6 rounded-full bg-blue"></div>
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
              onClick={() => navigate("volume")}
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
                    />
                  </LineChart>
                </ResponsiveContainer>
              }
              onClick={() => navigate("performance")}
            />

            <StatCard
              title="Consistency"
              subtitle="Your training patterns"
              statistic={
                <ResponsiveContainer
                  width="100%"
                  height="100%"
                >
                  <LineChart data={weeklyPreviewConsistencyData}>
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
              onClick={() => navigate("consistency")}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Statistics;
