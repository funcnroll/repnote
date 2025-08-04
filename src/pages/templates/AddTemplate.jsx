import { useDispatch, useSelector } from "react-redux";

import { removeExercise } from "../../app/templatesSlice";
import TemplateButton from "./TemplateButton";
import FormInput from "../../components/reusable/FormInput";
import { X } from "lucide-react";
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
          {/* {exercises.map((exercise) => (
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
              <button>
                <X
                  className="text-gray-400 hover:text-red-500 w-5 h-5"
                  onClick={() => dispatch(removeExercise(exercise.id))}
                />
              </button>
            </div>
          ))} */}
          {exercises.map((exercise) => (
            <ExerciseCard
              key={exercise.id}
              exercise={exercise}
              onRemove={(id) => dispatch(removeExercise(id))}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

export default AddTemplate;
