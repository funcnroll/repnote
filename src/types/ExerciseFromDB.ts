import { ForceType, MechanicType } from "./ExerciseTypes";

export interface ExerciseFromDB {
  id: string;
  name: string;
  force: ForceType;
  level: "beginner" | "intermediate" | "expert";
  mechanic: MechanicType;
  equipment: string; // more flexible
  primaryMuscles: string[];
  secondaryMuscles: string[];
  instructions: string[];
  category: string; // flexible
  images: string[];
}
