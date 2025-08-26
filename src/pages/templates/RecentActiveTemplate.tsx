import { loadRecentWorkoutsFromLocalStorage } from "@/app/localStorage";
import ChevronBack from "@/components/reusable/ChevronBack";
import H1 from "@/components/reusable/H1";
import { Check } from "lucide-react";
import { useParams } from "react-router";

function RecentActiveTemplate() {
  const { recentActiveTemplateId } = useParams();

  const recentWorkouts = loadRecentWorkoutsFromLocalStorage();

  const workout = recentWorkouts.find(
    (recWorkout) => recWorkout.id === recentActiveTemplateId
  );

  if (!workout) {
    return (
      <div className="h-screen overflow-y-auto bg-backgroundColor text-white px-6 py-8 pb-24">
        <ChevronBack />
        <H1 variant="medium">No workout found</H1>
      </div>
    );
  }

  return (
    <div className="h-screen overflow-y-auto bg-backgroundColor text-white px-6 py-8 pb-24">
      <ChevronBack />
      <H1 variant="medium">Recent Workout</H1>
      <H1 variant="medium">{workout.name}</H1>
      <div>
        {workout.exercises.map((exercise) => (
          <div
            key={exercise.id}
            className="bg-primaryColor w-full rounded-md mb-2"
          >
            {/* Exercise header - read only */}
            <div className="px-4 py-3">
              <div>
                <h2 className="text-lg font-semibold text-white">
                  {exercise.exerciseName}
                </h2>
                <p className="text-gray-400">Sets: {exercise.sets.length}</p>
              </div>
            </div>

            {/* Sets section - read only */}
            <div className="px-2 pb-3">
              {exercise.sets.map((set, setIndex) => (
                <div
                  key={set.id}
                  className={`flex items-center gap-2 sm:gap-4 mb-2 py-3 px-2 rounded-lg transition duration-200 ${
                    set.completed ? "bg-green-600" : "bg-gray-700/30"
                  }`}
                >
                  <div className="flex gap-2 sm:gap-4 flex-1 min-w-0">
                    <div className="flex flex-col items-center gap-2 flex-shrink-0">
                      <span className="text-sm text-gray-400 font-medium">
                        set
                      </span>
                      <div className="text-sm text-gray-400 font-medium">
                        {setIndex + 1}
                      </div>
                    </div>

                    <div className="flex flex-col items-center gap-2 flex-1 min-w-0">
                      <span className="text-white font-medium text-sm">
                        reps
                      </span>
                      <div className="text-white font-medium text-center">
                        {set.actualReps || set.reps || 0}
                      </div>
                    </div>

                    <div className="flex flex-col items-center gap-2 flex-1 min-w-0">
                      <span className="text-white font-medium text-sm">kg</span>
                      <div className="text-white font-medium text-center">
                        {set.weight || 0}
                      </div>
                    </div>
                  </div>
                  <div className="flex gap-1 items-center justify-center flex-shrink-0">
                    <div
                      className={`p-2 sm:p-3 rounded-lg ${
                        set.completed
                          ? "bg-green-600 text-white"
                          : "bg-gray-600 text-white"
                      }`}
                    >
                      <Check className="w-4 h-4 sm:w-5 sm:h-5" />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default RecentActiveTemplate;
