import StatCard from "../../components/reusable/StatisticCard";

import { Line, LineChart, ResponsiveContainer } from "recharts";
import { chartColors } from "../../../chartColors";
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
