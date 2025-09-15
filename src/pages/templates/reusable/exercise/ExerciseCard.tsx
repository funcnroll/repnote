import { X, Edit, ArrowUp, ArrowDown } from "lucide-react";
import { useNavigate, useParams } from "react-router";
import { Exercise } from "@/types/Exercise";
import ActiveTemplate from "../../ActiveTemplate";
import ActiveSetRow from "../set/ActiveSetRow";
import { useAppDispatch } from "@/app/hooks";
import {
  toggleSetComplete,
  updateSetReps,
  updateSetWeight,
  removeSetFromActiveTemplate,
} from "@/app/activeTemplateSlice";

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
}: ExerciseCardProps) {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const { activeTemplateId, templateId } = useParams();

  return (
    <div
      key={exercise.id}
      className="bg-primaryColor w-full rounded-md mb-2"
    >
      {/* Exercise header */}
      <div className="px-4 py-3 flex justify-between items-start">
        <div>
          <h2 className="text-lg font-semibold text-textPrimary">
            {exercise.exerciseName}
          </h2>
          {!activeTemplateId && (
            <p className="text-textSecondary">Sets: {exercise.sets.length}</p>
          )}
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
                  ? "text-textDisabled"
                  : "text-textSecondary hover:text-yellow"
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
                  ? "text-textDisabled"
                  : "text-textSecondary hover:text-yellow"
              }`}
            />
          </button>

          {/* Edit exercise details */}
          <button
            onClick={(e) => {
              e.preventDefault();

              if (onEdit) {
                onEdit(exercise.id);
              } else if (activeTemplateId) {
                navigate(
                  `/active-template/${activeTemplateId}/add-exercise/${exercise.id}`
                );
              } else if (templateId) {
                navigate(
                  `/add-template/${templateId}/add-exercise/${exercise.id}`
                );
              } else {
                // This shouldn't happen with the new nested structure, but fallback
                navigate(`/add-template/new/add-exercise/${exercise.id}`);
              }
            }}
          >
            <Edit className="text-textSecondary hover:text-blue w-5 h-5 cursor-pointer" />
          </button>

          {/* Remove exercise from template */}
          <button onClick={() => onRemove(exercise.id)}>
            <X className="text-textSecondary hover:text-red w-5 h-5 cursor-pointer" />
          </button>
        </div>
      </div>

      {/* Sets section, shown only in active template */}
      {activeTemplateId && (
        <div className="px-2 pb-3">
          {exercise.sets.map((set, setIndex) => (
            <ActiveSetRow
              key={set.id}
              setNumber={setIndex + 1}
              reps={set.reps}
              weight={set.weight}
              actualReps={set.actualReps}
              completed={set.completed}
              onToggleComplete={() => {
                dispatch(
                  toggleSetComplete({
                    exerciseId: exercise.id,
                    setId: set.id,
                  })
                );
              }}
              onRemove={() => {
                dispatch(
                  removeSetFromActiveTemplate({
                    exerciseId: exercise.id,
                    setId: set.id,
                  })
                );
              }}
              onRepsChange={(reps) => {
                if (reps !== null) {
                  dispatch(
                    updateSetReps({
                      exerciseId: exercise.id,
                      setId: set.id,
                      actualReps: reps,
                    })
                  );
                }
              }}
              onWeightChange={(weight) => {
                dispatch(
                  updateSetWeight({
                    exerciseId: exercise.id,
                    setId: set.id,
                    weight,
                  })
                );
              }}
            />
          ))}
        </div>
      )}
    </div>
  );
}

export default ExerciseCard;
