import { CompletedWorkout } from "@/types/CompletedWorkout";
import { loadRecentWorkoutsFromLocalStorage } from "@/app/localStorage";
import RecentWorkoutCard from "../../components/reusable/RecentWorkoutCard";

function History() {
  const allWorkouts = loadRecentWorkoutsFromLocalStorage();
  // Show all workouts, newest first (array is already stored in this order)
  const workouts = allWorkouts;

  return (
    <div className="p-4 pb-24 text-textPrimary">
      <div className="max-w-4xl mx-auto">
        <div className="p-6 bg-cardColor rounded-xl">
          <h2 className="flex items-center gap-2 mb-6 text-xl font-semibold">
            <div className="w-2 h-6 rounded-full bg-blue"></div>
            Workout History
          </h2>

          <div className="space-y-4">
            {workouts.length === 0 ? (
              <div className="py-8 text-center text-textSecondary">
                <p>No workout history found.</p>
                <p className="mt-2 text-sm">
                  Complete some workouts to see them here!
                </p>
              </div>
            ) : (
              workouts.map((workout: CompletedWorkout, index: number) => (
                <RecentWorkoutCard
                  key={workout.id}
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
