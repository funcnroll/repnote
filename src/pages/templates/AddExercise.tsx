import { useDispatch } from "react-redux";
import {
  addExerciseToTemplate,
  editExerciseInTemplate,
} from "../../app/templateSlice";
import {
  editExerciseInActiveTemplate,
  addExerciseToActiveTemplate,
} from "../../app/activeTemplateSlice";
import {
  setAddExerciseError,
  clearAddExerciseError,
} from "../../app/errorSlice";
import FormInput from "../../components/reusable/FormInput";
import ChevronBack from "../../components/reusable/ChevronBack";
import Error from "../../components/reusable/Error";
import Checkbox from "../../components/reusable/Checkbox";
import H1 from "../../components/reusable/H1";
import exercisesRaw from "../../data/exercises.json";
import { ExerciseFromDB } from "../../types/ExerciseFromDB";
import { searchExercises } from "../../services/exercises/searchExercises";
import { useDebouncedValue } from "../../hooks/useDebouncedValue";
import SearchExerciseCard from "./reusable/SearchExerciseCard";
import SetRow from "./reusable/SetRow";
import AddSetButton from "./reusable/AddSetButton";
import { Set } from "@/types/Set";
import { Exercise } from "@/types/Exercise";
import { removeIsCustomFromLocalStorage } from "../../app/localStorage";
import {
  addLocalSet,
  updateLocalSet,
  removeLocalSet,
} from "../../services/exercises/setLogic";
import SearchExercises from "./reusable/SearchExercises";
import { useExerciseForm } from "@/hooks/useExerciseForm";
import { useNavigate } from "react-router";

const exercises: ExerciseFromDB[] = exercisesRaw as ExerciseFromDB[];

function AddExercise() {
  const dispatch = useDispatch();

  const navigate = useNavigate();

  const {
    name,
    setName,
    localSets,
    setLocalSets,
    isCustom,
    setIsCustom,
    search,
    setSearch,
    exerciseId,
    isActiveTemplate,
    isTemplate,
    exerciseToEditData,
    error,
    exerciseToSelect,
  } = useExerciseForm();

  const debouncedSearch = useDebouncedValue(search, 150);

  return (
    <div className="h-screen overflow-y-auto bg-backgroundColor text-white px-6 py-8 pb-24">
      <ChevronBack />

      <H1 variant="medium">{exerciseId ? "Edit Exercise" : "Add Exercise"}</H1>

      <Checkbox
        label="Custom exercise?"
        checked={isCustom}
        onChange={setIsCustom}
      />

      {/* Search the database for exercises if not custom */}
      {!isCustom && (
        <div>
          <SearchExercises
            search={search}
            setSearch={setSearch}
          />

          {search.length > 0 &&
            exercises
              .filter((e) => searchExercises(e, debouncedSearch))
              .map((e) => (
                <SearchExerciseCard
                  key={e.id}
                  e={e}
                  func={exerciseToSelect}
                />
              ))}
        </div>
      )}

      {(isCustom || name) && (
        <FormInput
          required
          label="Exercise name"
          placeholder="Squats"
          disabled={!isCustom}
          onChange={(e) => {
            // If custom exercise, allow user input

            if (!isCustom) return;
            setName(e.target.value);

            if (error) dispatch(clearAddExerciseError());
          }}
          type="text"
          value={name}
        />
      )}
      {error && <Error msg={error} />}

      {/* Sets section */}
      <div className="flex flex-col mb-6">
        {localSets.map((set, index) => (
          <SetRow
            key={index}
            setNumber={index + 1}
            reps={set.reps}
            weight={set.weight}
            onRepsChange={(reps) =>
              updateLocalSet(localSets, setLocalSets, index, { reps })
            }
            onWeightChange={(weight) =>
              updateLocalSet(localSets, setLocalSets, index, { weight })
            }
            onRemove={() => removeLocalSet(localSets, setLocalSets, index)}
          />
        ))}

        <AddSetButton onClick={() => addLocalSet(localSets, setLocalSets)} />
      </div>

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
                }
              : {
                  id: Date.now().toString(),
                  exerciseName: name,
                  sets,
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
        className="w-full py-3 rounded-lg bg-blue-600 hover:bg-blue-700 font-medium transition cursor-pointer"
      >
        {exerciseId && exerciseToEditData ? "Edit Exercise" : "Add Exercise"}
      </button>
    </div>
  );
}

export default AddExercise;
