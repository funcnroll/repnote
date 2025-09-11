import { Exercise } from "./Exercise";

// Represents a completed workout session for localStorage storage
export interface CompletedWorkout {
  name: string;
  id: string;
  completedSets: number;
  sets: number;
  timestamp: string;
  exercises: Exercise[];
  duration: number; // In seconds
}
