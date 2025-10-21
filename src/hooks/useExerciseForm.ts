import { useAppSelector } from "@/app/hooks";
import { ExerciseFromDB } from "@/types/ExerciseFromDB";
import { Set } from "@/types/Set";
import { useEffect, useState } from "react";
import { useParams } from "react-router";
import exercisesRaw from "../data/exercises.json";
import { ForceType } from "@/types/ExerciseTypes";
import { MechanicType } from "../types/ExerciseTypes";

export function useExerciseForm() {
  const exercises: ExerciseFromDB[] = exercisesRaw as ExerciseFromDB[];

  const [name, setName] = useState("");
  const [primaryMuscles, setPrimaryMuscles] = useState<string[]>([]);
  const [secondaryMuscles, setSecondaryMuscles] = useState<string[]>([]);
  const [force, setForce] = useState<ForceType | null>(null);
  const [mechanic, setMechanic] = useState<MechanicType | null>(null);
  const [localSets, setLocalSets] = useState<Set[]>([]);
  const [search, setSearch] = useState("");

  const { exerciseId, activeTemplateId, templateId } = useParams();

  const isActiveTemplate = Boolean(activeTemplateId);
  const isTemplate = Boolean(templateId);

  const exerciseToEditData = useAppSelector((state) => {
    if (isActiveTemplate) {
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

  useEffect(() => {
    if (exerciseToEditData && exerciseId) {
      setName(exerciseToEditData.exerciseName);
      setLocalSets(exerciseToEditData.sets);

      if (exerciseToEditData.primaryMuscles) {
        setPrimaryMuscles(exerciseToEditData.primaryMuscles);
      }
      if (exerciseToEditData.secondaryMuscles) {
        setSecondaryMuscles(exerciseToEditData.secondaryMuscles);
      }
      if (exerciseToEditData.force) {
        setForce(exerciseToEditData.force);
      }
      if (exerciseToEditData.mechanic) {
        setMechanic(exerciseToEditData.mechanic);
      }

      // Sync with DB exercise metadata if it exists
      const exerciseFromDb = exercises.find(
        (dbExercise) =>
          dbExercise.name.toLowerCase() ===
          exerciseToEditData.exerciseName.toLowerCase()
      );

      if (exerciseFromDb) {
        setPrimaryMuscles(exerciseFromDb.primaryMuscles);
        setSecondaryMuscles(exerciseFromDb.secondaryMuscles);
        setForce(exerciseFromDb.force || null);
        setMechanic(exerciseFromDb.mechanic || null);
      }
    }
  }, [exerciseToEditData, exerciseId]);

  function exerciseToSelect(e: ExerciseFromDB) {
    setName(e.name);
    setPrimaryMuscles(e.primaryMuscles);
    setSecondaryMuscles(e.secondaryMuscles);
    setMechanic(e.mechanic || null);
    setForce(e.force || null);
    setSearch("");
  }

  return {
    name,
    setName,
    localSets,
    setLocalSets,
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
  };
}
