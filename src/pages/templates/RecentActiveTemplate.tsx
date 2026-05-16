import { loadRecentWorkoutsFromLocalStorage } from "@/app/localStorage";
import { useParams } from "react-router";
import WorkoutNotFound from "./reusable/workout/WorkoutNotFound";
import WorkoutPageLayout from "./reusable/workout/WorkoutPageLayout";
import WorkoutHeader from "./reusable/workout/WorkoutHeader";
import RecentExerciseCard from "./reusable/exercise/RecentExerciseCard";
import { useEffect, useRef } from "react";

function RecentActiveTemplate() {
  const { recentActiveTemplateId } = useParams();

  const containerRef = useRef<HTMLDivElement>(null);

  const recentWorkouts = loadRecentWorkoutsFromLocalStorage();

  const workout = recentWorkouts.find(
    (recWorkout) => recWorkout.id === recentActiveTemplateId,
  );

  // QOL Fix: scroll to top when a recent active template is clicked no matter the device
  useEffect(() => {
    window.scrollTo({ top: 0 });
  }, [recentActiveTemplateId]);

  if (!workout) {
    return <WorkoutNotFound />;
  }

  return (
    <div ref={containerRef}>
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
    </div>
  );
}

export default RecentActiveTemplate;
