import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addExercise, editExercise } from "../../app/templatesSlice";
import { useNavigate, useParams } from "react-router";
import FormInput from "../../components/reusable/FormInput";

function AddExercise() {
  const dispatch = useDispatch();

  const [name, setName] = useState("");
  const [reps, setReps] = useState("");
  const [sets, setSets] = useState("");

  const navigate = useNavigate();

  const { exerciseId } = useParams();

  const exerciseToEditData = useSelector((state) =>
    state.templates.tmpTemplate.exercises.find(
      (e) => String(e.id) === String(exerciseId)
    )
  );

  useEffect(() => {
    if (exerciseToEditData) {
      setName(exerciseToEditData.exerciseName);
      setSets(exerciseToEditData.sets);
      setReps(exerciseToEditData.reps);
    }
  }, [exerciseToEditData]);

  return (
    <div className="min-h-screen bg-[#0f172a] text-white px-6 py-8">
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
        onClick={() => {
          const exerciseData = {
            exerciseName: name,
            sets: parseInt(sets),
            reps: parseInt(reps),
          };

          if (exerciseId && exerciseToEditData?.id) {
            dispatch(
              editExercise({
                ...exerciseData,
                id: exerciseToEditData.id,
              })
            );
          } else {
            dispatch(addExercise(exerciseData));
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
