import ChevronBack from "@/components/reusable/ChevronBack";
import { useParams } from "react-router";
import H1 from "@/components/reusable/H1";
import { useAppSelector, useAppDispatch } from "@/app/hooks";
import {
  removeExerciseFromActiveTemplate,
  reorderExerciseInActiveTemplate,
} from "@/app/activeTemplateSlice";
import ExerciseCard from "./ExerciseCard";

function ActiveTemplate() {
  const { activeTemplateId } = useParams();
  const dispatch = useAppDispatch();

  const activeTemplate = useAppSelector(
    (state) => state.activeTemplate.activeTemplate
  );

  return (
    <div className="dvh-full overflow-y-auto bg-backgroundColor text-white px-6 py-8">
      <ChevronBack />

      <H1 variant="medium">Active Template</H1>

      <div>
        {activeTemplate?.exercises.map((exercise, index) => (
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
            showProgress={true}
          />
        ))}
      </div>
    </div>
  );
}

export default ActiveTemplate;
