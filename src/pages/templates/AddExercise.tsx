import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import {
  addExerciseToTemplate,
  editExerciseInTemplate,
} from "../../app/templateSlice";
import {
  setAddExerciseError,
  clearAddExerciseError,
} from "../../app/errorSlice";
import { useNavigate, useParams } from "react-router";
import FormInput from "../../components/reusable/FormInput";
import ChevronBack from "../../components/reusable/ChevronBack";
import Error from "../../components/reusable/Error";
import Checkbox from "../../components/reusable/Checkbox";
import { useAppSelector } from "../../app/hooks";
import H1 from "../../components/reusable/H1";
import { Search } from "lucide-react";
import exercisesRaw from "../../data/exercises.json";
import { ExerciseFromDB } from "../../types/ExerciseFromDB";
import { searchExercises } from "../../helpers/searchExercises";
import { useDebouncedValue } from "../../helpers/useDebouncedValue";
import SearchExerciseCard from "./reusable/SearchExerciseCard";
import SetRow from "./reusable/SetRow";
import AddSetButton from "./reusable/AddSetButton";
import { Set } from "@/types/Set";
import { Exercise } from "@/types/Exercise";

const exercises: ExerciseFromDB[] = exercisesRaw as ExerciseFromDB[];

function AddExercise() {
  const dispatch = useDispatch();

  const [name, setName] = useState("");

  const [localSets, setLocalSets] = useState<Set[]>([]);

  const [isCustom, setIsCustom] = useState(false);
  const [search, setSearch] = useState("");

  const debouncedSearch = useDebouncedValue(search, 150);

  const navigate = useNavigate();

  const { exerciseId } = useParams();

  // Find exercise data if we're in edit mode
  const exerciseToEditData = useAppSelector((state) =>
    state.templates.draftTemplate.exercises.find(
      (e) => String(e.id) === String(exerciseId)
    )
  );
  const error = useAppSelector((state) => state.error.addExercise);

  // Populate form with existing data when editing an exercise
  useEffect(() => {
    if (exerciseToEditData) {
      setName(exerciseToEditData.exerciseName);

      // TODO: Make set and rep populating work when editing
    }
  }, [exerciseToEditData]);

  function exerciseToSelect(e: ExerciseFromDB) {
    setName(e.name);
    setSearch("");
  }

  // Add a new set to local state
  function addLocalSet() {
    const newSet: Set = {
      id: localSets.length, // Use index as temporary ID
      reps: null,
      weight: null,
      actualReps: null,
      completed: false,
      notes: "",
      rpe: null,
    };
    setLocalSets([...localSets, newSet]);
  }

  // Update a specific set
  function updateLocalSet(index: number, updatedSet: Partial<Set>) {
    setLocalSets(
      localSets.map((set, i) => (i === index ? { ...set, ...updatedSet } : set))
    );
  }

  // Remove a set
  function removeLocalSet(index: number) {
    setLocalSets(localSets.filter((_, i) => i !== index));
  }

  return (
    <div className="min-h-screen bg-backgroundColor text-white px-6 py-8">
      <ChevronBack />

      <H1 variant="medium">Add Exercise</H1>

      <Checkbox
        label="Custom exercise?"
        checked={isCustom}
        onChange={setIsCustom}
      />

      {!isCustom && (
        <div>
          <div className="mb-6">
            <div className="relative">
              <FormInput
                placeholder="Search for an exercise.."
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
              <Search className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5 pointer-events-none" />
            </div>
          </div>

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

      <div className="flex flex-col mb-6">
        {localSets.map((set, index) => (
          <SetRow
            key={index}
            setNumber={index + 1}
            reps={set.reps}
            weight={set.weight}
            completed={set.completed}
            onRepsChange={(reps) => updateLocalSet(index, { reps })}
            onWeightChange={(weight) => updateLocalSet(index, { weight })}
            onToggleComplete={() =>
              updateLocalSet(index, { completed: !set.completed })
            }
            onRemove={() => removeLocalSet(index)}
          />
        ))}

        <AddSetButton onClick={addLocalSet} />
      </div>

      <button
        onClick={(e) => {
          e.preventDefault();

          // Validate exercise name
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
          if (exerciseId && exerciseToEditData?.id) {
            const exerciseData: Exercise = {
              id: exerciseToEditData.id,
              exerciseName: name,
              sets,
            };
            dispatch(editExerciseInTemplate(exerciseData));
          } else {
            const exerciseData = {
              exerciseName: name,
              sets,
            };
            dispatch(addExerciseToTemplate(exerciseData));
          }

          navigate(-1);
        }}
        className="w-full py-3 rounded-lg bg-blue-600 hover:bg-blue-700 font-medium transition cursor-pointer"
      >
        {exerciseId ? "Edit Exercise" : "Add Exercise"}
      </button>
    </div>
  );
}

export default AddExercise;
