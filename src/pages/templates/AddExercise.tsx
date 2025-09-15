import { useDispatch } from "react-redux";
import { clearAddExerciseError } from "../../app/errorSlice";
import FormInput from "../../components/reusable/FormInput";
import ChevronBack from "../../components/reusable/ChevronBack";
import Error from "../../components/reusable/Error";
import Checkbox from "../../components/reusable/Checkbox";
import H1 from "../../components/reusable/H1";
import exercisesRaw from "../../data/exercises.json";
import { ExerciseFromDB } from "../../types/ExerciseFromDB";
import { searchExercises } from "../../services/exercises/searchExercises";
import { useDebouncedValue } from "../../hooks/useDebouncedValue";
import SearchExerciseCard from "./reusable/search/SearchExerciseCard";
import SetRow from "./reusable/set/SetRow";
import AddSetButton from "./reusable/set/AddSetButton";

import {
  addLocalSet,
  updateLocalSet,
  removeLocalSet,
} from "../../services/exercises/setLogic";
import SearchExercises from "./reusable/search/SearchExercises";
import AddExerciseButton from "./reusable/add/AddExerciseButton";
import { useExerciseForm } from "@/hooks/useExerciseForm";

const exercises: ExerciseFromDB[] = exercisesRaw as ExerciseFromDB[];

function AddExercise() {
  const dispatch = useDispatch();

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
    primaryMuscles,
    secondaryMuscles,
    force,
    mechanic,
  } = useExerciseForm();

  const debouncedSearch = useDebouncedValue(search, 150);

  return (
    <div className="h-screen overflow-y-auto bg-backgroundColor text-textPrimary px-6 py-8 pb-24">
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

      <AddExerciseButton
        name={name}
        localSets={localSets}
        exerciseId={exerciseId}
        exerciseToEditData={exerciseToEditData}
        isActiveTemplate={isActiveTemplate}
        isTemplate={isTemplate}
        primaryMuscles={primaryMuscles}
        secondaryMuscles={secondaryMuscles}
        force={force}
        mechanic={mechanic}
      />
    </div>
  );
}

export default AddExercise;
