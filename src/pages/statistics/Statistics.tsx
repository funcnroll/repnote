import { loadRecentWorkoutsFromLocalStorage } from "@/app/localStorage";
import StatCard from "../../components/reusable/StatisticCard";

function Statistics() {
  const data = loadRecentWorkoutsFromLocalStorage();

  // Sort data descending (most recent first)
  const sortedData = data.sort(
    (a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()
  );
  console.log(sortedData);

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
              statistic="12"
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
