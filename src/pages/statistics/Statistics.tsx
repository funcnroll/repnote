import StatCard from "../../components/reusable/StatisticCard";

function Statistics() {
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
              title="Workout Frequency"
              subtitle="Sessions this week"
              statistic="12"
              onClick={() =>
                console.log("Navigate to Workout Frequency details")
              }
            />

            <StatCard
              title="Performance Over Time"
              subtitle="Strength progress"
              statistic="+15%"
              onClick={() => console.log("Navigate to Performance details")}
            />

            <StatCard
              title="Template Breakdown"
              subtitle="Push / Pull / Legs"
              statistic="3/2/1"
              onClick={() =>
                console.log("Navigate to Template Breakdown details")
              }
            />

            <StatCard
              title="Workout Duration"
              subtitle="Average session length"
              statistic="45min"
              onClick={() => console.log("Navigate to Duration details")}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Statistics;
