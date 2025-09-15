import { useDispatch } from "react-redux";
import { useNavigate } from "react-router";
import {
  addExerciseToTemplate,
  editExerciseInTemplate,
} from "../../../app/templateSlice";
import {
  editExerciseInActiveTemplate,
  addExerciseToActiveTemplate,
} from "../../../app/activeTemplateSlice";
import {
  setAddExerciseError,
  clearAddExerciseError,
} from "../../../app/errorSlice";
import { Set } from "@/types/Set";
import { Exercise } from "@/types/Exercise";
import { removeIsCustomFromLocalStorage } from "../../../app/localStorage";
import { ForceType, MechanicType } from "@/types/ExerciseTypes";

interface AddExerciseButtonProps {
  name: string;
  localSets: Set[];
  exerciseId: string | undefined;
  exerciseToEditData: Exercise | undefined;
  isActiveTemplate: boolean;
  isTemplate: boolean;
  primaryMuscles: string[];
  secondaryMuscles: string[];

  force: ForceType;
  mechanic: MechanicType;
}

function AddExerciseButton({
  name,
  localSets,
  exerciseId,
  exerciseToEditData,
  isActiveTemplate,
  isTemplate,
  primaryMuscles,
  secondaryMuscles,
  mechanic,
  force,
}: AddExerciseButtonProps) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  return (
    <button
      onClick={(e) => {
        e.preventDefault();

        if (!name.trim()) {
          dispatch(setAddExerciseError("Exercise name is required"));
          return;
        }

        const sets: Set[] = localSets.map((set, index) => ({
          ...set,
          id: Date.now() + index, // Generate proper IDs for Redux
        }));

        dispatch(clearAddExerciseError());

        // Update existing exercise or add new one based on mode
        const exerciseDataSwitch: Exercise =
          exerciseId && exerciseToEditData?.id
            ? {
                id: exerciseToEditData.id,
                exerciseName: name,
                sets,
                primaryMuscles,
                secondaryMuscles,
              }
            : {
                id: Date.now().toString(),
                exerciseName: name,
                sets,
                primaryMuscles,
                secondaryMuscles,
                force,
                mechanic,
              };

        switch (true) {
          //  Exercise is being edited in an active template
          case isActiveTemplate && Boolean(exerciseToEditData):
            dispatch(editExerciseInActiveTemplate(exerciseDataSwitch));
            break;

          //  Exercise is being edited in a non-active template
          case !isActiveTemplate && Boolean(exerciseToEditData):
            dispatch(editExerciseInTemplate(exerciseDataSwitch));
            break;

          //  Adding a new exercise to a non-active template
          case isTemplate && !Boolean(exerciseId):
            dispatch(addExerciseToTemplate(exerciseDataSwitch));
            break;
          //  Adding a new exercise to an active template
          case isActiveTemplate && !Boolean(exerciseToEditData):
            dispatch(addExerciseToActiveTemplate(exerciseDataSwitch));
            break;

          default:
            console.error("Invalid state for adding/editing exercise");
        }

        // Clean up localStorage for isCustom when done editing
        if (exerciseId) {
          removeIsCustomFromLocalStorage(exerciseId);
        }

        navigate(-1);
      }}
      className="w-full py-3 rounded-lg bg-blue hover:bg-blueHover font-medium transition cursor-pointer"
    >
      {exerciseId && exerciseToEditData ? "Edit Exercise" : "Add Exercise"}
    </button>
  );
}

export default AddExerciseButton;
