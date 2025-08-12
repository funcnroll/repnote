import { useDispatch, useSelector } from "react-redux";

import {
  addTemplate,
  editTemplateName,
  removeExerciseFromTemplate,
  reorderExerciseInTemplate,
  updateTemplate,
} from "../../app/templateSlice";
import TemplateButton from "./TemplateButton";
import FormInput from "../../components/reusable/FormInput";
import ExerciseCard from "./ExerciseCard";

import { useNavigate, useParams } from "react-router";
import ChevronBack from "../../components/reusable/ChevronBack";

function AddTemplate() {
  const exercises = useSelector(
    (state) => state.templates.tmpTemplate.exercises
  );
  const tmpTemplate = useSelector((state) => state.templates.tmpTemplate);
  const templates = useSelector((state) => state.templates.templates);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const templateName = useSelector((state) => state.templates.tmpTemplate.name);

  const { templateId } = useParams();

  const isEditMode = templates.some((t) => String(t.id) === String(templateId));

  return (
    <div className="dvh-full overflow-y-auto bg-backgroundColor text-white px-6 py-8">
      <ChevronBack />
      <h1 className="text-2xl font-semibold mb-8">New Template</h1>

      <form>
        <FormInput
          label="Template Name"
          placeholder="Leg Day"
          value={templateName ?? ""}
          required
          onChange={(e) => dispatch(editTemplateName(e.target.value))}
        />
        <div className="flex flex-col gap-4">
          <TemplateButton to="/add-exercise">+ Add Exercise</TemplateButton>
          <TemplateButton
            onClick={(e) => {
              e.preventDefault();

              if (isEditMode) {
                dispatch(updateTemplate(tmpTemplate));
              } else {
                dispatch(addTemplate({ templateName, tmpTemplate }));
              }
              navigate("/templates");
            }}
          >
            {isEditMode ? "Edit Template" : "+ Add Template"}
          </TemplateButton>

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
                onEdit={(id) => navigate(`/add-exercise/${id}`)}
              />
            ))}
          </div>
        </div>
      </form>
    </div>
  );
}

export default AddTemplate;
