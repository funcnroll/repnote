import { Set } from "./Set";

export interface Exercise {
  id: string;
  exerciseName: string;
  sets: Set[];
  primaryMuscles?: string[];
  secondaryMuscles?: string[];
  force?: "push" | "pull" | "static" | null;
  mechanic?: "compound" | "isolation" | null;
}
