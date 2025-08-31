import { useEffect, useState } from "react";
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
import { useNavigate, useParams } from "react-router";
import FormInput from "../../components/reusable/FormInput";
import ChevronBack from "../../components/reusable/ChevronBack";
import Error from "../../components/reusable/Error";
import Checkbox from "../../components/reusable/Checkbox";
import { useAppSelector } from "../../app/hooks";
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
import {
  saveIsCustomToLocalStorage,
  loadIsCustomFromLocalStorage,
  removeIsCustomFromLocalStorage,
} from "../../app/localStorage";
import {
  addLocalSet,
  updateLocalSet,
  removeLocalSet,
} from "../../services/exercises/setLogic";
import SearchExercises from "./reusable/SearchExercises";

const exercises: ExerciseFromDB[] = exercisesRaw as ExerciseFromDB[];

function AddExercise() {
  const dispatch = useDispatch();

  const [name, setName] = useState("");

  const [localSets, setLocalSets] = useState<Set[]>([]);

  const [isCustom, setIsCustom] = useState(false);
  const [search, setSearch] = useState("");

  const debouncedSearch = useDebouncedValue(search, 150);

  const navigate = useNavigate();

  const { exerciseId, activeTemplateId, templateId } = useParams();

  // Check if we're editing in an active template context
  const isActiveTemplateEdit = Boolean(activeTemplateId);
  // Check if we're in template creation context
  const isTemplateEdit = Boolean(templateId);

  // Find exercise data if we're in edit mode
  const exerciseToEditData = useAppSelector((state) => {
    if (isActiveTemplateEdit) {
      return state.activeTemplate.activeTemplate?.exercises.find(
        (e) => String(e.id) === String(exerciseId)
      );
    } else {
      return state.templates.draftTemplate.exercises.find(
        (e) => String(e.id) === String(exerciseId)
      );
    }
  });
  const error = useAppSelector((state) => state.error.addExercise);

  // Populate form with existing data when editing an exercise
  useEffect(() => {
    if (exerciseToEditData && exerciseId) {
      setName(exerciseToEditData.exerciseName);
      setLocalSets(exerciseToEditData.sets);

      // Check if this exercise exists in the predefined exercises list
      const isExerciseFromDB = exercises.some(
        (dbExercise) =>
          dbExercise.name.toLowerCase() ===
          exerciseToEditData.exerciseName.toLowerCase()
      );

      // If exercise doesn't exist in DB, it's custom
      // Otherwise, check localStorage for user preference
      if (!isExerciseFromDB) {
        setIsCustom(true);
        // Save this as custom to localStorage for future reference
        saveIsCustomToLocalStorage(exerciseId, true);
      } else {
        // Load isCustom state from localStorage for DB exercises
        const savedIsCustom = loadIsCustomFromLocalStorage(exerciseId);
        setIsCustom(savedIsCustom);
      }
    }
  }, [exerciseToEditData, exerciseId]);

  // Save isCustom state to localStorage whenever it changes (only when editing)
  useEffect(() => {
    if (exerciseId && exerciseToEditData) {
      saveIsCustomToLocalStorage(exerciseId, isCustom);
    }
  }, [isCustom, exerciseId, exerciseToEditData]);

  function exerciseToSelect(e: ExerciseFromDB) {
    setName(e.name);
    setSearch("");
  }

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
          if (exerciseId && exerciseToEditData?.id) {
            const exerciseData: Exercise = {
              id: exerciseToEditData.id,
              exerciseName: name,
              sets,
            };

            if (isActiveTemplateEdit) {
              dispatch(editExerciseInActiveTemplate(exerciseData));
            } else {
              dispatch(editExerciseInTemplate(exerciseData));
            }
          } else {
            // Adding new exercise
            const exerciseData: Exercise = {
              id: Date.now().toString(),
              exerciseName: name,
              sets,
            };

            if (isActiveTemplateEdit) {
              dispatch(addExerciseToActiveTemplate(exerciseData));
            } else if (isTemplateEdit) {
              dispatch(addExerciseToTemplate(exerciseData));
            }
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
