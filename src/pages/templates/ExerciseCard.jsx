import { X, Edit, ArrowUp, ArrowDown } from "lucide-react";
import { useNavigate } from "react-router";

function ExerciseCard({
  exercise,
  onRemove,
  onEdit,
  index,
  total,
  onMoveUp,
  onMoveDown,
}) {
  const navigate = useNavigate();

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

      <div className="flex gap-2 items-center">
        {/* move up */}

        <button
          disabled={index === 0}
          onClick={(e) => {
            e.preventDefault();
            onMoveUp(index);
          }}
        >
          <ArrowUp
            className={`w-5 h-5 cursor-pointer ${
              index === 0
                ? "text-gray-600"
                : "text-gray-400 hover:text-yellow-400"
            }`}
          />
        </button>

        {/* move down */}

        <button
          disabled={index === total - 1}
          onClick={(e) => {
            e.preventDefault();
            onMoveDown(index);
          }}
        >
          <ArrowDown
            className={`w-5 h-5 cursor-pointer ${
              index === total - 1
                ? "text-gray-600"
                : "text-gray-400 hover:text-yellow-400"
            }`}
          />
        </button>

        {/* edit */}
        <button
          onClick={(e) => {
            e.preventDefault();

            onEdit
              ? onEdit(exercise.id)
              : navigate(`/add-exercise/${exercise.id}`);
          }}
        >
          <Edit className="text-gray-400 hover:text-blue-400 w-5 h-5 cursor-pointer" />
        </button>
        <button onClick={() => onRemove(exercise.id)}>
          <X className="text-gray-400 hover:text-red-500 w-5 h-5 cursor-pointer" />
        </button>
      </div>
    </div>
  );
}

export default ExerciseCard;
