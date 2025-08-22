import { X, Edit, ArrowUp, ArrowDown } from "lucide-react";
import { useNavigate } from "react-router";

interface Exercise {
  id: string;
  exerciseName: string;
  sets: number;
  reps: number;
  setsDone?: number;
  exerciseId?: string | null;
  isCustom?: boolean | null;
}

// Props for the ExerciseCard component used in template creation/editing
interface ExerciseCardProps {
  exercise: Exercise;
  onRemove: (exerciseId: string) => void; // Callback to remove this exercise
  onEdit?: (exerciseId: string) => void; // Optional callback to edit this exercise
  index: number; // Position in the exercises array
  total: number; // Total number of exercises
  onMoveUp: () => void; // Callback to move exercise up in order
  onMoveDown: () => void; // Callback to move exercise down in order
  showProgress?: boolean; // Optional flag to show sets done progress
}

function ExerciseCard({
  exercise,
  onRemove,
  onEdit,
  index,
  total,
  onMoveUp,
  onMoveDown,
  showProgress = false,
}: ExerciseCardProps) {
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
          {showProgress && exercise.setsDone !== undefined && (
            <span className="text-yellow-400 ml-2">
              ({exercise.setsDone}/{exercise.sets} done)
            </span>
          )}
        </p>
      </div>

      {/* Action buttons for exercise management */}
      <div className="flex gap-2 items-center">
        {/* Move exercise up in order (disabled if first) */}
        <button
          disabled={index === 0}
          onClick={(e) => {
            e.preventDefault();
            onMoveUp();
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

        {/* Move exercise down in order (disabled if last) */}
        <button
          disabled={index === total - 1}
          onClick={(e) => {
            e.preventDefault();
            onMoveDown();
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

        {/* Edit exercise details */}
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

        {/* Remove exercise from template */}
        <button onClick={() => onRemove(exercise.id)}>
          <X className="text-gray-400 hover:text-red-500 w-5 h-5 cursor-pointer" />
        </button>
      </div>
    </div>
  );
}

export default ExerciseCard;
