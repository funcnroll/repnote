// Shared workout-related type definitions

// Represents a completed workout session for localStorage storage
export interface CompletedWorkout {
  name: string;
  sets: number;
  timestamp: string;
}

// Represents data needed to save a workout from a template
export interface WorkoutFromTemplate {
  name: string;
  totalSets: number;
  completedAt: string;
}