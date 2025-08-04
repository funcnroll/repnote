import { useState } from "react";
import { useDispatch } from "react-redux";
import { addExercise } from "../../app/templatesSlice";
import { useNavigate } from "react-router";
import FormInput from "../../components/reusable/FormInput";

function AddExercise() {
  const dispatch = useDispatch();

  const [name, setName] = useState("");
  const [reps, setReps] = useState(0);
  const [sets, setSets] = useState(0);

  const navigate = useNavigate(-1);

  return (
    <div className="min-h-screen bg-[#0f172a] text-white px-6 py-8">
      <h1 className="text-2xl font-semibold mb-8">Add Exercise</h1>

      {/* <div className="mb-6">
        <label className="block text-sm text-gray-400 mb-2">
          Exercise name
        </label>
        <input
          required
          onChange={(e) => setName(e.target.value)}
          type="text"
          placeholder="Squats"
          className="w-full px-4 py-3 rounded-lg bg-primaryColor placeholder-gray-400 focus:outline-none"
        />
      </div> */}
      <FormInput
        label="Exercise name"
        placeholder="Squats"
        value={name}
        onChange={(e) => setName(e.target.value)}
        type="text"
      />

      <div className="flex justify-between gap-4 mb-6">
        <div className="flex-1">
          <FormInput
            label="Sets"
            placeholder="3"
            onChange={(e) => setSets(e.target.value)}
            type="number"
          />
        </div>
        <div className="flex-1">
          <FormInput
            label="Reps"
            placeholder="10"
            onChange={(e) => setReps(e.target.value)}
            type="number"
          />
        </div>
      </div>

      <button
        onClick={() => {
          dispatch(
            addExercise({
              exerciseName: name,
              sets: parseInt(sets),
              reps: parseInt(reps),
            })
          );

          navigate(-1);
        }}
        className="w-full py-3 rounded-lg bg-blue-600 hover:bg-blue-700 font-medium transition"
      >
        Add Exercise
      </button>
    </div>
  );
}

export default AddExercise;
