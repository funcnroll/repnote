import { X } from "lucide-react";

function ExerciseCard({ exercise, onRemove }) {
  return (
    <div
      key={exercise.id}
      className="bg-primaryColor w-full px-4 py-3 rounded-md mb-2 flex justify-between items-start"
    >
      <div>
        <h2 className="text-lg font-semibold text-white">
          {exercise.exerciseName}
        </h2>
        <p className="text-gray-400">
          Sets: {exercise.sets} Reps: {exercise.reps}
        </p>
      </div>
      <button>
        <X
          className="text-gray-400 hover:text-red-500 w-5 h-5"
          onClick={() => onRemove(exercise.id)}
        />
      </button>
    </div>
  );
}

export default ExerciseCard;
