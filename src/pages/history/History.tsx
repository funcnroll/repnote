import { CompletedWorkout } from "@/types/CompletedWorkout";
import { loadRecentWorkoutsFromLocalStorage } from "@/app/localStorage";
import RecentWorkoutCard from "../../components/reusable/RecentWorkoutCard";

function History() {
  const allWorkouts = loadRecentWorkoutsFromLocalStorage();
  // Show all workouts, newest first
  const workouts = allWorkouts.slice().reverse();

  return (
    <div className="h-screen overflow-y-auto p-4 pb-24 text-white">
      <div className="max-w-4xl mx-auto">
        <div className="bg-cardColor p-6 rounded-xl">
          <h2 className="text-xl font-semibold mb-6 flex items-center gap-2">
            <div className="w-2 h-6 bg-blue-500 rounded-full"></div>
            Workout History
          </h2>

          <div className="space-y-4">
            {workouts.length === 0 ? (
              <div className="text-center py-8 text-gray-400">
                <p>No workout history found.</p>
                <p className="text-sm mt-2">
                  Complete some workouts to see them here!
                </p>
              </div>
            ) : (
              workouts.map((workout: CompletedWorkout, index: number) => (
                <RecentWorkoutCard
                  key={index}
                  workout={workout}
                  index={index}
                />
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default History;
