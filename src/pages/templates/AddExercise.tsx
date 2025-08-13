import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import {
  addExerciseToTemplate,
  editExerciseInTemplate,
} from "@/app/templateSlice";
import { useNavigate, useParams } from "react-router";
import FormInput from "../../components/reusable/FormInput";
import ChevronBack from "../../components/reusable/ChevronBack";
import { useAppSelector } from "@/app/hooks";

function AddExercise() {
  const dispatch = useDispatch();

  const [name, setName] = useState("");
  const [reps, setReps] = useState("");
  const [sets, setSets] = useState("");

  const navigate = useNavigate();

  const { exerciseId } = useParams();

  const exerciseToEditData = useAppSelector((state) =>
    state.templates.tmpTemplate.exercises.find(
      (e) => String(e.id) === String(exerciseId)
    )
  );

  useEffect(() => {
    if (exerciseToEditData) {
      setName(exerciseToEditData.exerciseName);
      setSets(String(exerciseToEditData.sets));
      setReps(String(exerciseToEditData.reps));
    }
  }, [exerciseToEditData]);

  return (
    <div className="min-h-screen bg-backgroundColor text-white px-6 py-8">
      <ChevronBack />

      <h1 className="text-2xl font-semibold mb-8">Add Exercise</h1>
      <FormInput
        required
        label="Exercise name"
        placeholder="Squats"
        onChange={(e) => setName(e.target.value)}
        type="text"
        value={name}
      />

      <div className="flex justify-between gap-4 mb-6">
        <div className="flex-1">
          <FormInput
            required
            label="Sets"
            placeholder="3"
            onChange={(e) => setSets(e.target.value)}
            type="number"
            value={sets}
          />
        </div>
        <div className="flex-1">
          <FormInput
            required
            label="Reps"
            placeholder="10"
            onChange={(e) => setReps(e.target.value)}
            type="number"
            value={reps}
          />
        </div>
      </div>

      <button
        onClick={(e) => {
          e.preventDefault();

          const exerciseData = {
            exerciseName: name,
            sets: parseInt(sets),
            reps: parseInt(reps),
          };

          if (exerciseId && exerciseToEditData?.id) {
            dispatch(
              editExerciseInTemplate({
                ...exerciseData,
                id: exerciseToEditData.id,
              })
            );
          } else {
            dispatch(addExerciseToTemplate(exerciseData));
          }

          navigate(-1);
        }}
        className="w-full py-3 rounded-lg bg-blue-600 hover:bg-blue-700 font-medium transition"
      >
        {exerciseId ? "Edit Exercise" : "Add Exercise"}
      </button>
    </div>
  );
}

export default AddExercise;
