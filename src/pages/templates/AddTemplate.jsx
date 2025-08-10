import { useDispatch, useSelector } from "react-redux";

import {
  addTemplate,
  editTemplateName,
  removeExercise,
} from "../../app/templatesSlice";
import TemplateButton from "./TemplateButton";
import FormInput from "../../components/reusable/FormInput";
import ExerciseCard from "./ExerciseCard";

import { useNavigate, useParams } from "react-router";

function AddTemplate() {
  const exercises = useSelector(
    (state) => state.templates.tmpTemplate.exercises
  );
  const tmpTemplate = useSelector((state) => state.templates.tmpTemplate);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const templateName = useSelector((state) => state.templates.tmpTemplate.name);

  const { templateId } = useParams();

  const template = useSelector((state) =>
    state.templates.templates.find((t) => String(t.id) === String(templateId))
  );

  return (
    <div className="dvh-full overflow-y-auto bg-backgroundColor text-white px-6 py-8">
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
              dispatch(addTemplate({ templateName, tmpTemplate }));
              navigate("/templates");
            }}
          >
            {templateId ? "Edit Template" : "+ Add Template"}
          </TemplateButton>

          {templateId && (
            <div className="flex flex-col items-center justify-center mt-6 w-full">
              {template.exercises.map((exercise) => (
                <ExerciseCard
                  key={exercise.id}
                  exercise={exercise}
                  onRemove={(id) => dispatch(removeExercise(id))}
                  onEdit={(id) => navigate(`/add-exercise/${id}`)}
                />
              ))}
            </div>
          )}

          {!templateId && (
            <div className="flex flex-col items-center justify-center mt-6 w-full">
              {exercises.map((exercise) => (
                <ExerciseCard
                  key={exercise.id}
                  exercise={exercise}
                  onRemove={(id) => dispatch(removeExercise(id))}
                  onEdit={(id) => navigate(`/add-exercise/${id}`)}
                />
              ))}
            </div>
          )}
        </div>
      </form>
    </div>
  );
}

export default AddTemplate;
