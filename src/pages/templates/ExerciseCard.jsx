import { X, Edit } from "lucide-react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router";
import { selectExerciseToEdit } from "../../app/templatesSlice";

function ExerciseCard({ exercise, onRemove }) {
  const dispatch = useDispatch();

  const navigate = useNavigate();

  return (
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

      <div className="flex gap-2">
        <button
          onClick={() => {
            dispatch(selectExerciseToEdit(exercise));
            navigate("/add-exercise");
          }}
        >
          <Edit className="text-gray-400 hover:text-blue-400 w-5 h-5 cursor-pointer" />
        </button>
        <button onClick={() => onRemove(exercise.id)}>
          <X className="text-gray-400 hover:text-red-500 w-5 h-5 cursor-pointer" />
        </button>
      </div>
    </div>
  );
}

export default ExerciseCard;
