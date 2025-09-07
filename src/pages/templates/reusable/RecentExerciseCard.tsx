import { Exercise } from "@/types/Exercise";
import ExerciseHeader from "./ExerciseHeader";
import SetDisplay from "./SetDisplay";

interface RecentExerciseCardProps {
  exercise: Exercise;
}

function RecentExerciseCard({ exercise }: RecentExerciseCardProps) {
  return (
    <div className="bg-primaryColor w-full rounded-md mb-2">
      <ExerciseHeader
        exerciseName={exercise.exerciseName}
        setsCount={exercise.sets.length}
      />
      <div className="px-2 pb-3">
        {exercise.sets.map((set, setIndex) => (
          <SetDisplay
            key={set.id}
            set={set}
            setNumber={setIndex + 1}
          />
        ))}
      </div>
    </div>
  );
}

export default RecentExerciseCard;