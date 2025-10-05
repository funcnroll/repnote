import ChevronBack from "@/components/reusable/ChevronBack";
import VolumeChart from "./VolumeChart";
import { useStatisticsData } from "@/hooks/useStatisticsData";

function Volume() {
  const { weeksArr } = useStatisticsData();

  console.log(weeksArr);
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
          <VolumeChart subtitle="Completed sets vs actual sets">
            Primary weekly trend
          </VolumeChart>
        </div>
      </div>
    </div>
  );
}

export default Volume;
