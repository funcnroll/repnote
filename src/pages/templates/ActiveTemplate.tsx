import ChevronBack from "@/components/reusable/ChevronBack";
import H1 from "@/components/reusable/H1";
import Button from "@/components/reusable/Button";
import { useAppSelector, useAppDispatch } from "@/app/hooks";
import {
  removeExerciseFromActiveTemplate,
  reorderExerciseInActiveTemplate,
  finishTemplate,
} from "@/app/activeTemplateSlice";
import { updateTemplateFromActive } from "@/app/templateSlice";
import ExerciseCard from "./reusable/exercise/ExerciseCard";
import { useNavigate } from "react-router";
import { isNotWorkingOut } from "@/app/homeSlice";

function ActiveTemplate() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const activeTemplate = useAppSelector(
    (state) => state.activeTemplate.activeTemplate
  );

  if (!activeTemplate) {
    return (
      <div className="bg-backgroundColor text-textPrimary px-6 py-8 pb-24">
        <ChevronBack />
        <H1 variant="medium">No Active Workout</H1>
        <p className="text-textSecondary mt-4">
          No active workout found. Please start a workout from the Templates
          page.
        </p>
      </div>
    );
  }

  return (
    <div className="bg-backgroundColor text-textPrimary px-6 py-8 pb-24">
      <ChevronBack />

      <H1 variant="medium">Active Template</H1>
      <H1 variant="medium">{activeTemplate.name}</H1>

      <div>
        {activeTemplate.exercises.map((exercise, index) => (
          <ExerciseCard
            key={exercise.id}
            exercise={exercise}
            index={index}
            total={activeTemplate.exercises.length}
            onRemove={(exerciseId) =>
              dispatch(removeExerciseFromActiveTemplate(exerciseId))
            }
            onMoveUp={() =>
              dispatch(
                reorderExerciseInActiveTemplate({ from: index, to: index - 1 })
              )
            }
            onMoveDown={() =>
              dispatch(
                reorderExerciseInActiveTemplate({ from: index, to: index + 1 })
              )
            }
          />
        ))}
      </div>

      {/* Add Exercise Button */}
      <div className="mt-6">
        <Button
          to={`/active-template/${activeTemplate.id}/add-exercise`}
          fullWidth
        >
          + Add Exercise
        </Button>
      </div>

      {/* Finish Workout Buttons */}
      <div className="flex flex-col gap-4 mt-8">
        <button
          onClick={() => {
            dispatch(finishTemplate());
            dispatch(isNotWorkingOut());
            navigate("/");
          }}
          className="w-full py-3 rounded-lg bg-green hover:bg-greenHover font-medium transition cursor-pointer"
        >
          Finish Workout
        </button>

        <button
          onClick={() => {
            if (activeTemplate) {
              dispatch(
                updateTemplateFromActive({
                  templateId: activeTemplate.id,
                  exercises: activeTemplate.exercises,
                })
              );
              dispatch(finishTemplate());
              dispatch(isNotWorkingOut());

              navigate("/");
            }
          }}
          className="w-full py-3 rounded-lg bg-blue hover:bg-blueHover font-medium transition cursor-pointer"
        >
          Finish Workout (Modify Template)
        </button>
      </div>
    </div>
  );
}

export default ActiveTemplate;
