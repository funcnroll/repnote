import { loadRecentWorkoutsFromLocalStorage } from "@/app/localStorage";
import { useParams } from "react-router";
import WorkoutNotFound from "./reusable/WorkoutNotFound";
import WorkoutPageLayout from "./reusable/WorkoutPageLayout";
import WorkoutHeader from "./reusable/WorkoutHeader";
import RecentExerciseCard from "./reusable/RecentExerciseCard";

function RecentActiveTemplate() {
  const { recentActiveTemplateId } = useParams();

  const recentWorkouts = loadRecentWorkoutsFromLocalStorage();

  const workout = recentWorkouts.find(
    (recWorkout) => recWorkout.id === recentActiveTemplateId
  );

  if (!workout) {
    return <WorkoutNotFound />;
  }

  return (
    <WorkoutPageLayout>
      <WorkoutHeader workoutName={workout.name} />
      <div>
        {workout.exercises.map((exercise) => (
          <RecentExerciseCard key={exercise.id} exercise={exercise} />
        ))}
      </div>
    </WorkoutPageLayout>
  );
}

export default RecentActiveTemplate;
