import { Exercise } from "./Exercise";

export interface CompletedWorkout {
  name: string;
  id: string;
  completedSets: number;
  sets: number;
  timestamp: string; // ISO  format timestamp
  exercises: Exercise[];
  duration: number; // In seconds
}
