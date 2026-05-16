import { loadRecentWorkoutsFromLocalStorage } from "@/app/localStorage";
import { useParams } from "react-router";
import WorkoutNotFound from "./reusable/workout/WorkoutNotFound";
import WorkoutPageLayout from "./reusable/workout/WorkoutPageLayout";
import WorkoutHeader from "./reusable/workout/WorkoutHeader";
import RecentExerciseCard from "./reusable/exercise/RecentExerciseCard";
import { useEffect } from "react";

function RecentActiveTemplate() {
  const { recentActiveTemplateId } = useParams();

  const recentWorkouts = loadRecentWorkoutsFromLocalStorage();

  const workout = recentWorkouts.find(
    (recWorkout) => recWorkout.id === recentActiveTemplateId,
  );

  if (!workout) {
    return <WorkoutNotFound />;
  }

  // QOL Fix: scroll to top when a recent active template is clicked no matter the device
  useEffect(() => {
    setTimeout(() => {
      window.scrollTo(0, 0);
      document.body.scrollTo(0, 0);
      document.documentElement.scrollTo(0, 0);
      document.querySelector(".overflow-y-auto")?.scrollTo({ top: 0 });
    }, 0);
  }, []);

  return (
    <WorkoutPageLayout>
      <WorkoutHeader workoutName={workout.name} />
      <div>
        {workout.exercises.map((exercise) => (
          <RecentExerciseCard
            key={exercise.id}
            exercise={exercise}
          />
        ))}
      </div>
    </WorkoutPageLayout>
  );
}

export default RecentActiveTemplate;
