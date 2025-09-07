import { CompletedWorkout } from "@/types/CompletedWorkout";
import { loadRecentWorkoutsFromLocalStorage } from "@/app/localStorage";
import RecentWorkoutCard from "../../components/reusable/RecentWorkoutCard";

function RecentWorkouts() {
  const allWorkouts = loadRecentWorkoutsFromLocalStorage();
  // Only show the last 4 workouts (most recent)
  const recentWorkouts = allWorkouts.slice(-4).reverse(); // Get last 4 and reverse for newest first

  return (
    <div className="bg-[#1c2331] p-6 rounded-xl mt-8">
      <h2 className="text-xl font-semibold mb-6 flex items-center gap-2">
        <div className="w-2 h-6 bg-blue-500 rounded-full"></div>
        Recent Workouts
      </h2>

      <div className="space-y-4">
        {recentWorkouts.map((workout: CompletedWorkout, index: number) => (
          <RecentWorkoutCard key={index} workout={workout} index={index} />
        ))}
      </div>
    </div>
  );
}

export default RecentWorkouts;
