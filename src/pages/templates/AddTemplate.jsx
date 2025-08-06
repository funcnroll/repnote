import { useDispatch, useSelector } from "react-redux";

import {
  addTemplate,
  editExercise,
  removeExercise,
} from "../../app/templatesSlice";
import TemplateButton from "./TemplateButton";
import FormInput from "../../components/reusable/FormInput";

import ExerciseCard from "./ExerciseCard";
import { useState } from "react";
import { useNavigate } from "react-router";

function AddTemplate() {
  const exercises = useSelector(
    (state) => state.templates.tmpTemplate.exercises
  );
  const tmpTemplate = useSelector((state) => state.templates.tmpTemplate);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [templateName, setTemplateName] = useState("");

  return (
    <div className="dvh-full overflow-y-auto bg-backgroundColor text-white px-6 py-8">
      <h1 className="text-2xl font-semibold mb-8">New Template</h1>

      <form>
        <FormInput
          label="Template Name"
          placeholder="Leg Day"
          required
          onChange={(e) => setTemplateName(e.target.value)}
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
            + Add Template
          </TemplateButton>

          <div className="flex flex-col items-center justify-center mt-6 w-full">
            {exercises.map((exercise) => (
              <ExerciseCard
                key={exercise.id}
                exercise={exercise}
                onRemove={(id) => dispatch(removeExercise(id))}
                onEdit={(id) => dispatch(editExercise(id))}
              />
            ))}
          </div>
        </div>
      </form>
    </div>
  );
}

export default AddTemplate;
