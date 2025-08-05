import { useDispatch, useSelector } from "react-redux";

import { editExercise, removeExercise } from "../../app/templatesSlice";
import TemplateButton from "./TemplateButton";
import FormInput from "../../components/reusable/FormInput";

import ExerciseCard from "./ExerciseCard";

function AddTemplate() {
  const exercises = useSelector(
    (state) => state.templates.tmpTemplate.exercises
  );

  const dispatch = useDispatch();

  return (
    <div className="dvh-full bg-backgroundColor text-white px-6 py-8">
      <h1 className="text-2xl font-semibold mb-8">New Template</h1>

      <FormInput
        label="Template Name"
        placeholder="Leg Day"
        required
      />
      <div className="flex flex-col gap-4">
        <TemplateButton to="/add-exercise">+ Add Exercise</TemplateButton>
        <TemplateButton to="">+ Add Template</TemplateButton>

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
    </div>
  );
}

export default AddTemplate;
