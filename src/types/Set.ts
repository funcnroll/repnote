export interface Set {
  id: number;
  reps: number; // Target/planned reps for this set
  weight?: number; // Weight used for this set (optional for bodyweight exercises)
  actualReps?: number; // Actual reps performed (may differ from planned)
  completed: boolean; // Whether this set has been completed
  notes?: string; // Optional notes about the set
  rpe?: number; // Rate of Perceived Exertion (1-10 scale)
}
