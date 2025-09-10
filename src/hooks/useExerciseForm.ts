import { useAppSelector } from "@/app/hooks";
import {
  loadIsCustomFromLocalStorage,
  saveIsCustomToLocalStorage,
} from "@/app/localStorage";
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

  const [primaryMuscles, setPrimaryMuscles] = useState(<string[]>[]);

  const [secondaryMuscles, setSecondaryMuscles] = useState(<string[]>[]);
  const [force, setForce] = useState(<ForceType>"");

  const [mechanic, setMechanic] = useState(<MechanicType>"");

  const [localSets, setLocalSets] = useState<Set[]>([]);

  const [isCustom, setIsCustom] = useState(false);
  const [search, setSearch] = useState("");

  const { exerciseId, activeTemplateId, templateId } = useParams();

  // Check if we're editing in an active template context
  const isActiveTemplate = Boolean(activeTemplateId);
  // Check if we're in template creation context
  const isTemplate = Boolean(templateId);

  // Find exercise data if we're in edit mode
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
  };
}
