import {
  addTemplate,
  editTemplateName,
  removeExerciseFromTemplate,
  reorderExerciseInTemplate,
  updateTemplate,
} from "@/app/templateSlice";
import { setAddTemplateError, clearAddTemplateError } from "@/app/errorSlice";
import Button from "../../components/reusable/Button";
import FormInput from "../../components/reusable/FormInput";
import ExerciseCard from "./reusable/ExerciseCard";
import Error from "../../components/reusable/Error";
import H1 from "../../components/reusable/H1";

import { useNavigate, useParams } from "react-router";
import ChevronBack from "../../components/reusable/ChevronBack";
import { useAppDispatch, useAppSelector } from "@/app/hooks";

function AddTemplate() {
  const exercises = useAppSelector(
    (state) => state.templates.draftTemplate.exercises
  );
  const draftTemplate = useAppSelector(
    (state) => state.templates.draftTemplate
  );
  const templates = useAppSelector((state) => state.templates.templates);

  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const templateName = useAppSelector(
    (state) => state.templates.draftTemplate.name
  );
  const error = useAppSelector((state) => state.error.addTemplate);

  const { templateId } = useParams();

  // Determine if we're editing an existing template or creating a new one
  const isEditMode = templates.some((t) => String(t.id) === String(templateId));

  return (
    <div className="h-screen overflow-y-auto bg-backgroundColor text-white px-6 py-8 pb-24">
      <ChevronBack />

      {error && <Error msg={error} />}

      <H1 variant="medium">New Template</H1>

      <form>
        <FormInput
          label="Template Name"
          placeholder="Leg Day"
          value={templateName ?? ""}
          required
          onChange={(e) => {
            dispatch(editTemplateName(e.target.value));
            if (error) dispatch(clearAddTemplateError());
          }}
        />

        <div className="flex flex-col gap-4">
          <Button
            to={`/add-template/${templateId || "new"}/add-exercise`}
            fullWidth
            onClick={() => {
              if (error) dispatch(clearAddTemplateError());
            }}
          >
            + Add Exercise
          </Button>
          <Button
            fullWidth
            onClick={(e) => {
              e.preventDefault();

              dispatch(clearAddTemplateError());

              // Validate template name
              if (!templateName?.trim()) {
                dispatch(setAddTemplateError("Template name is required"));
                return;
              }

              // Validate at least one exercise exists
              if (exercises.length === 0) {
                dispatch(
                  setAddTemplateError("At least one exercise is required")
                );
                return;
              }

              // Validate all exercises have names
              const hasInvalidExercises = exercises.some(
                (exercise) => !exercise.exerciseName?.trim()
              );
              if (hasInvalidExercises) {
                dispatch(setAddTemplateError("All exercises must have a name"));
                return;
              }

              // Save or update the template based on current mode
              if (isEditMode) {
                dispatch(updateTemplate(draftTemplate));
              } else {
                dispatch(addTemplate({ templateName, draftTemplate }));
              }
              navigate("/templates");
            }}
          >
            {isEditMode ? "Edit Template" : "+ Add Template"}
          </Button>

          {/* Exercise list with reordering and editing capabilities */}
          <div className="flex flex-col items-center justify-center mt-6 w-full">
            {exercises.map((exercise, index) => (
              <ExerciseCard
                key={exercise.id}
                exercise={exercise}
                index={index}
                total={exercises.length}
                onMoveUp={() =>
                  dispatch(
                    reorderExerciseInTemplate({ from: index, to: index - 1 })
                  )
                }
                onMoveDown={() =>
                  dispatch(
                    reorderExerciseInTemplate({ from: index, to: index + 1 })
                  )
                }
                onRemove={(id) => dispatch(removeExerciseFromTemplate(id))}
                onEdit={(id) =>
                  navigate(
                    `/add-template/${templateId || "new"}/add-exercise/${id}`
                  )
                }
              />
            ))}
          </div>
        </div>
      </form>
    </div>
  );
}

export default AddTemplate;
