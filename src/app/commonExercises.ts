export interface Exercise {
  id: string;
  name: string;
  category: string;
  muscleGroups: string[];
}

export const commonExercises: Exercise[] = [
  // Chest
  { id: 'chest_bench_press', name: 'Bench Press', category: 'Chest', muscleGroups: ['Chest', 'Triceps', 'Shoulders'] },
  { id: 'chest_incline_bench', name: 'Incline Bench Press', category: 'Chest', muscleGroups: ['Chest', 'Triceps', 'Shoulders'] },
  { id: 'chest_decline_bench', name: 'Decline Bench Press', category: 'Chest', muscleGroups: ['Chest', 'Triceps'] },
  { id: 'chest_dumbbell_press', name: 'Dumbbell Press', category: 'Chest', muscleGroups: ['Chest', 'Triceps', 'Shoulders'] },
  { id: 'chest_incline_dumbbell', name: 'Incline Dumbbell Press', category: 'Chest', muscleGroups: ['Chest', 'Triceps', 'Shoulders'] },
  { id: 'chest_flyes', name: 'Chest Flyes', category: 'Chest', muscleGroups: ['Chest'] },
  { id: 'chest_dips', name: 'Chest Dips', category: 'Chest', muscleGroups: ['Chest', 'Triceps', 'Shoulders'] },
  { id: 'chest_pushups', name: 'Push-ups', category: 'Chest', muscleGroups: ['Chest', 'Triceps', 'Shoulders'] },

  // Back
  { id: 'back_deadlift', name: 'Deadlift', category: 'Back', muscleGroups: ['Back', 'Hamstrings', 'Glutes', 'Traps'] },
  { id: 'back_pullups', name: 'Pull-ups', category: 'Back', muscleGroups: ['Back', 'Biceps'] },
  { id: 'back_chinups', name: 'Chin-ups', category: 'Back', muscleGroups: ['Back', 'Biceps'] },
  { id: 'back_bent_rows', name: 'Bent-Over Rows', category: 'Back', muscleGroups: ['Back', 'Biceps'] },
  { id: 'back_lat_pulldown', name: 'Lat Pulldown', category: 'Back', muscleGroups: ['Back', 'Biceps'] },
  { id: 'back_seated_rows', name: 'Seated Cable Rows', category: 'Back', muscleGroups: ['Back', 'Biceps'] },
  { id: 'back_t_bar_rows', name: 'T-Bar Rows', category: 'Back', muscleGroups: ['Back', 'Biceps'] },
  { id: 'back_single_arm_rows', name: 'Single-Arm Dumbbell Rows', category: 'Back', muscleGroups: ['Back', 'Biceps'] },

  // Legs
  { id: 'legs_squat', name: 'Squat', category: 'Legs', muscleGroups: ['Quadriceps', 'Glutes', 'Hamstrings'] },
  { id: 'legs_front_squat', name: 'Front Squat', category: 'Legs', muscleGroups: ['Quadriceps', 'Glutes', 'Core'] },
  { id: 'legs_leg_press', name: 'Leg Press', category: 'Legs', muscleGroups: ['Quadriceps', 'Glutes', 'Hamstrings'] },
  { id: 'legs_lunges', name: 'Lunges', category: 'Legs', muscleGroups: ['Quadriceps', 'Glutes', 'Hamstrings'] },
  { id: 'legs_bulgarian_split', name: 'Bulgarian Split Squats', category: 'Legs', muscleGroups: ['Quadriceps', 'Glutes'] },
  { id: 'legs_leg_extensions', name: 'Leg Extensions', category: 'Legs', muscleGroups: ['Quadriceps'] },
  { id: 'legs_leg_curls', name: 'Leg Curls', category: 'Legs', muscleGroups: ['Hamstrings'] },
  { id: 'legs_calf_raises', name: 'Calf Raises', category: 'Legs', muscleGroups: ['Calves'] },

  // Shoulders
  { id: 'shoulders_overhead_press', name: 'Overhead Press', category: 'Shoulders', muscleGroups: ['Shoulders', 'Triceps'] },
  { id: 'shoulders_dumbbell_press', name: 'Dumbbell Shoulder Press', category: 'Shoulders', muscleGroups: ['Shoulders', 'Triceps'] },
  { id: 'shoulders_lateral_raises', name: 'Lateral Raises', category: 'Shoulders', muscleGroups: ['Shoulders'] },
  { id: 'shoulders_front_raises', name: 'Front Raises', category: 'Shoulders', muscleGroups: ['Shoulders'] },
  { id: 'shoulders_rear_delt_flyes', name: 'Rear Delt Flyes', category: 'Shoulders', muscleGroups: ['Shoulders'] },
  { id: 'shoulders_upright_rows', name: 'Upright Rows', category: 'Shoulders', muscleGroups: ['Shoulders', 'Traps'] },
  { id: 'shoulders_shrugs', name: 'Shrugs', category: 'Shoulders', muscleGroups: ['Traps'] },

  // Arms - Biceps
  { id: 'biceps_barbell_curls', name: 'Barbell Curls', category: 'Arms', muscleGroups: ['Biceps'] },
  { id: 'biceps_dumbbell_curls', name: 'Dumbbell Curls', category: 'Arms', muscleGroups: ['Biceps'] },
  { id: 'biceps_hammer_curls', name: 'Hammer Curls', category: 'Arms', muscleGroups: ['Biceps', 'Forearms'] },
  { id: 'biceps_preacher_curls', name: 'Preacher Curls', category: 'Arms', muscleGroups: ['Biceps'] },
  { id: 'biceps_cable_curls', name: 'Cable Curls', category: 'Arms', muscleGroups: ['Biceps'] },

  // Arms - Triceps
  { id: 'triceps_close_grip_bench', name: 'Close-Grip Bench Press', category: 'Arms', muscleGroups: ['Triceps', 'Chest'] },
  { id: 'triceps_tricep_dips', name: 'Tricep Dips', category: 'Arms', muscleGroups: ['Triceps'] },
  { id: 'triceps_overhead_extension', name: 'Overhead Tricep Extension', category: 'Arms', muscleGroups: ['Triceps'] },
  { id: 'triceps_cable_pushdowns', name: 'Cable Tricep Pushdowns', category: 'Arms', muscleGroups: ['Triceps'] },
  { id: 'triceps_diamond_pushups', name: 'Diamond Push-ups', category: 'Arms', muscleGroups: ['Triceps', 'Chest'] },

  // Core
  { id: 'core_plank', name: 'Plank', category: 'Core', muscleGroups: ['Core'] },
  { id: 'core_crunches', name: 'Crunches', category: 'Core', muscleGroups: ['Core'] },
  { id: 'core_russian_twists', name: 'Russian Twists', category: 'Core', muscleGroups: ['Core'] },
  { id: 'core_leg_raises', name: 'Leg Raises', category: 'Core', muscleGroups: ['Core'] },
  { id: 'core_bicycle_crunches', name: 'Bicycle Crunches', category: 'Core', muscleGroups: ['Core'] },
  { id: 'core_mountain_climbers', name: 'Mountain Climbers', category: 'Core', muscleGroups: ['Core', 'Shoulders'] },
  { id: 'core_hanging_knee_raises', name: 'Hanging Knee Raises', category: 'Core', muscleGroups: ['Core'] },

  // Cardio
  { id: 'cardio_treadmill', name: 'Treadmill', category: 'Cardio', muscleGroups: ['Cardiovascular'] },
  { id: 'cardio_cycling', name: 'Cycling', category: 'Cardio', muscleGroups: ['Cardiovascular', 'Legs'] },
  { id: 'cardio_rowing', name: 'Rowing Machine', category: 'Cardio', muscleGroups: ['Cardiovascular', 'Back', 'Arms'] },
  { id: 'cardio_elliptical', name: 'Elliptical', category: 'Cardio', muscleGroups: ['Cardiovascular'] },
  { id: 'cardio_burpees', name: 'Burpees', category: 'Cardio', muscleGroups: ['Cardiovascular', 'Full Body'] },
];
