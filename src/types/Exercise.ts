import { ForceType, MechanicType } from "./ExerciseTypes";
import { Set } from "./Set";

export interface Exercise {
  id: string;
  exerciseName: string;
  sets: Set[];
  primaryMuscles?: string[];
  secondaryMuscles?: string[];
  force?: ForceType;
  mechanic?: MechanicType;
}
