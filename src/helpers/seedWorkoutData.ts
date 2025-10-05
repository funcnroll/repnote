import { CompletedWorkout } from "../types/CompletedWorkout";
import { Exercise } from "../types/Exercise";
import { Set } from "../types/Set";
import { generateId } from "./generateId";
import { Template } from "../app/templateSlice";
import exercisesRaw from "../data/exercises.json";
import { ExerciseFromDB } from "../types/ExerciseFromDB";

const exercises: ExerciseFromDB[] = exercisesRaw as ExerciseFromDB[];

// PPL Exercise mapping with specific exercises from the database
const PPL_EXERCISES = {
  push: [
    // Compound movements
    { name: "Barbell Bench Press - Medium Grip", isCompound: true },
    { name: "Incline Dumbbell Press", isCompound: true },
    { name: "Dumbbell Shoulder Press", isCompound: true },
    { name: "Close-Grip Barbell Bench Press", isCompound: true },

    // Accessories
    { name: "Incline Dumbbell Flyes", isCompound: false },
    { name: "Lateral Raise", isCompound: false },
    { name: "Dips - Triceps Version", isCompound: false },
    { name: "Triceps Dumbbell Extension", isCompound: false },
    { name: "Overhead Cable Extension", isCompound: false },
    { name: "Front Two-Dumbbell Raise", isCompound: false },
  ],
  pull: [
    // Compound movements
    { name: "Barbell Deadlift", isCompound: true },
    { name: "Wide-Grip Lat Pulldown", isCompound: true },
    { name: "Barbell Rows", isCompound: true },
    { name: "Pull-ups", isCompound: true },

    // Accessories
    { name: "Cable Rows", isCompound: false },
    { name: "Hammer Curls", isCompound: false },
    { name: "Barbell Curl", isCompound: false },
    { name: "Face Pull", isCompound: false },
    { name: "Reverse Flyes", isCompound: false },
    { name: "Preacher Curl", isCompound: false },
  ],
  legs: [
    // Compound movements
    { name: "Barbell Squat", isCompound: true },
    { name: "Romanian Deadlift", isCompound: true },
    { name: "Leg Press", isCompound: true },
    { name: "Bulgarian Split Squat", isCompound: true },

    // Accessories
    { name: "Leg Extensions", isCompound: false },
    { name: "Lying Leg Curls", isCompound: false },
    { name: "Walking, Lunge", isCompound: false },
    { name: "Calf Press", isCompound: false },
    { name: "Glute Ham Raise", isCompound: false },
    { name: "Seated Calf Raise", isCompound: false },
  ],
};

// Starting weights and progression rates
const EXERCISE_PROGRESSIONS = {
  // Compound movements - higher starting weights, faster progression
  "Barbell Bench Press - Medium Grip": { startWeight: 135, weeklyIncrease: 5 },
  "Barbell Squat": { startWeight: 185, weeklyIncrease: 5 },
  "Barbell Deadlift": { startWeight: 225, weeklyIncrease: 5 },
  "Incline Dumbbell Press": { startWeight: 60, weeklyIncrease: 5 },
  "Dumbbell Shoulder Press": { startWeight: 40, weeklyIncrease: 2.5 },
  "Wide-Grip Lat Pulldown": { startWeight: 120, weeklyIncrease: 5 },
  "Barbell Rows": { startWeight: 115, weeklyIncrease: 5 },
  "Romanian Deadlift": { startWeight: 155, weeklyIncrease: 5 },
  "Leg Press": { startWeight: 270, weeklyIncrease: 10 },
  "Close-Grip Barbell Bench Press": { startWeight: 115, weeklyIncrease: 2.5 },
  "Pull-ups": { startWeight: 0, weeklyIncrease: 0 }, // Bodyweight progression
  "Bulgarian Split Squat": { startWeight: 30, weeklyIncrease: 2.5 },

  // Isolation movements - lower starting weights, slower progression
  "Incline Dumbbell Flyes": { startWeight: 25, weeklyIncrease: 1.25 },
  "Lateral Raise": { startWeight: 15, weeklyIncrease: 1.25 },
  "Dips - Triceps Version": { startWeight: 0, weeklyIncrease: 0 }, // Bodyweight
  "Triceps Dumbbell Extension": { startWeight: 25, weeklyIncrease: 1.25 },
  "Cable Rows": { startWeight: 100, weeklyIncrease: 2.5 },
  "Hammer Curls": { startWeight: 25, weeklyIncrease: 1.25 },
  "Barbell Curl": { startWeight: 60, weeklyIncrease: 2.5 },
  "Face Pull": { startWeight: 40, weeklyIncrease: 1.25 },
  "Leg Extensions": { startWeight: 80, weeklyIncrease: 2.5 },
  "Lying Leg Curls": { startWeight: 60, weeklyIncrease: 2.5 },
  "Walking, Lunge": { startWeight: 20, weeklyIncrease: 2.5 },
  "Calf Press": { startWeight: 180, weeklyIncrease: 5 },
  "Seated Calf Raise": { startWeight: 45, weeklyIncrease: 2.5 },
  // Default fallback
  default: { startWeight: 35, weeklyIncrease: 2.5 },
};

function getExerciseWeight(exerciseName: string, weekNumber: number): number {
  const progression =
    EXERCISE_PROGRESSIONS[exerciseName as keyof typeof EXERCISE_PROGRESSIONS] ||
    EXERCISE_PROGRESSIONS.default;
  return progression.startWeight + progression.weeklyIncrease * weekNumber;
}

function getRepRange(
  exerciseName: string,
  isCompound: boolean
): { min: number; max: number; sets: number } {
  if (isCompound) {
    return { min: 6, max: 8, sets: 4 }; // Strength focus
  }

  // Isolation exercises
  const isolationExercises = [
    "Lateral Raise",
    "Face Pull",
    "Calf Press",
    "Seated Calf Raise",
  ];
  if (isolationExercises.some((ex) => exerciseName.includes(ex))) {
    return { min: 12, max: 15, sets: 3 }; // Pump/endurance focus
  }

  return { min: 8, max: 12, sets: 3 }; // Hypertrophy focus
}

function createExerciseSet(
  exerciseName: string,
  weekNumber: number,
  isCompound: boolean,
  setNumber: number,
  isPartialWorkout: boolean
): Set {
  const weight = getExerciseWeight(exerciseName, weekNumber);
  const { min, max } = getRepRange(exerciseName, isCompound);
  const targetReps = Math.floor(Math.random() * (max - min + 1)) + min;

  // Bodyweight exercises
  const isBodyweight = weight === 0;

  // Progressive rep increases for bodyweight exercises
  let actualReps = targetReps;
  if (isBodyweight && weekNumber > 0) {
    const repProgression = Math.floor(weekNumber / 4); // Add 1 rep every 4 weeks
    actualReps = Math.min(targetReps + repProgression, 15);
  }

  // Determine if set is completed (partial workouts have some incomplete sets)
  let completed = true;
  if (isPartialWorkout && setNumber > 2 && Math.random() < 0.6) {
    completed = false;
  }

  return {
    id: setNumber,
    reps: targetReps,
    weight: isBodyweight ? null : weight,
    actualReps: completed ? actualReps : null,
    completed,
  };
}

function createWorkoutExercise(
  exerciseName: string,
  weekNumber: number,
  isPartialWorkout: boolean
): Exercise {
  const exerciseData =
    PPL_EXERCISES.push.find((ex) => ex.name === exerciseName) ||
    PPL_EXERCISES.pull.find((ex) => ex.name === exerciseName) ||
    PPL_EXERCISES.legs.find((ex) => ex.name === exerciseName);

  if (!exerciseData) {
    throw new Error(`Exercise not found: ${exerciseName}`);
  }

  const { sets: numSets } = getRepRange(exerciseName, exerciseData.isCompound);
  const sets: Set[] = [];

  for (let i = 1; i <= numSets; i++) {
    sets.push(
      createExerciseSet(
        exerciseName,
        weekNumber,
        exerciseData.isCompound,
        i,
        isPartialWorkout
      )
    );
  }

  const dbExercise = exercises.find((e) => e.name === exerciseName);

  return {
    id: generateId(),
    exerciseName,
    sets,
    primaryMuscles: dbExercise?.primaryMuscles,
    secondaryMuscles: dbExercise?.secondaryMuscles,
    force: dbExercise?.force,
    mechanic: dbExercise?.mechanic,
  };
}

function createWorkout(
  workoutType: "push" | "pull" | "legs",
  workoutDate: Date,
  weekNumber: number,
  dayVariation: 1 | 2
): CompletedWorkout {
  const isPartialWorkout = Math.random() < 0.2; // 20% partial workouts

  let exerciseSelection: string[] = [];

  // Select exercises based on workout type and day variation
  if (workoutType === "push") {
    if (dayVariation === 1) {
      exerciseSelection = [
        "Barbell Bench Press - Medium Grip",
        "Incline Dumbbell Press",
        "Dumbbell Shoulder Press",
        "Incline Dumbbell Flyes",
        "Lateral Raise",
        "Triceps Dumbbell Extension",
      ];
    } else {
      exerciseSelection = [
        "Incline Dumbbell Press",
        "Close-Grip Barbell Bench Press",
        "Dumbbell Shoulder Press",
        "Dips - Triceps Version",
        "Front Two-Dumbbell Raise",
        "Overhead Cable Extension",
      ];
    }
  } else if (workoutType === "pull") {
    if (dayVariation === 1) {
      exerciseSelection = [
        "Barbell Deadlift",
        "Wide-Grip Lat Pulldown",
        "Barbell Rows",
        "Barbell Curl",
        "Face Pull",
        "Hammer Curls",
      ];
    } else {
      exerciseSelection = [
        "Pull-ups",
        "Cable Rows",
        "Wide-Grip Lat Pulldown",
        "Preacher Curl",
        "Reverse Flyes",
        "Hammer Curls",
      ];
    }
  } else {
    // legs
    if (dayVariation === 1) {
      exerciseSelection = [
        "Barbell Squat",
        "Romanian Deadlift",
        "Leg Extensions",
        "Walking, Lunge",
        "Calf Press",
        "Glute Ham Raise",
      ];
    } else {
      exerciseSelection = [
        "Leg Press",
        "Bulgarian Split Squat",
        "Lying Leg Curls",
        "Walking, Lunge",
        "Seated Calf Raise",
        "Glute Ham Raise",
      ];
    }
  }

  // Create exercises
  const workoutExercises: Exercise[] = exerciseSelection.map((name) =>
    createWorkoutExercise(name, weekNumber, isPartialWorkout)
  );

  // Calculate totals
  const totalSets = workoutExercises.reduce(
    (sum, ex) => sum + ex.sets.length,
    0
  );
  const completedSets = workoutExercises.reduce(
    (sum, ex) => sum + ex.sets.filter((set) => set.completed).length,
    0
  );

  const workoutName = `${workoutType
    .charAt(0)
    .toUpperCase()}${workoutType.slice(1)} Day ${dayVariation}`;

  // Generate a workout that lasts between 45 and 135 minutes in seconds
  const minDuration = 45 * 60;
  const maxDuration = 135 * 60;
  const duration = Math.floor(
    Math.random() * (maxDuration - minDuration + 1) + minDuration
  );

  return {
    id: generateId(),
    name: workoutName,
    sets: totalSets,
    completedSets,
    timestamp: workoutDate.toISOString(),
    exercises: workoutExercises,
    duration: duration,
  };
}

function createTemplateExercise(exerciseName: string): Exercise {
  const exerciseData =
    PPL_EXERCISES.push.find((ex) => ex.name === exerciseName) ||
    PPL_EXERCISES.pull.find((ex) => ex.name === exerciseName) ||
    PPL_EXERCISES.legs.find((ex) => ex.name === exerciseName);

  if (!exerciseData) {
    throw new Error(`Exercise not found: ${exerciseName}`);
  }

  const { sets: numSets, min } = getRepRange(
    exerciseName,
    exerciseData.isCompound
  );
  const sets: Set[] = [];

  for (let i = 1; i <= numSets; i++) {
    sets.push({
      id: i,
      reps: min, // Use minimum reps for template
      weight: null, // Templates don't have preset weights
      actualReps: null,
      completed: false,
    });
  }

  return {
    id: generateId(),
    exerciseName,
    sets,
  };
}

export function generatePPLTemplates(): Template[] {
  const templates: Template[] = [];

  // Push Day 1 Template
  const pushDay1Exercises = [
    "Barbell Bench Press - Medium Grip",
    "Incline Dumbbell Press",
    "Dumbbell Shoulder Press",
    "Incline Dumbbell Flyes",
    "Lateral Raise",
    "Triceps Dumbbell Extension",
  ].map(createTemplateExercise);

  templates.push({
    id: generateId(),
    name: "Push Day 1",
    exercises: pushDay1Exercises,
  });

  // Push Day 2 Template
  const pushDay2Exercises = [
    "Incline Dumbbell Press",
    "Close-Grip Barbell Bench Press",
    "Dumbbell Shoulder Press",
    "Dips - Triceps Version",
    "Front Two-Dumbbell Raise",
    "Overhead Cable Extension",
  ].map(createTemplateExercise);

  templates.push({
    id: generateId(),
    name: "Push Day 2",
    exercises: pushDay2Exercises,
  });

  // Pull Day 1 Template
  const pullDay1Exercises = [
    "Barbell Deadlift",
    "Wide-Grip Lat Pulldown",
    "Barbell Rows",
    "Barbell Curl",
    "Face Pull",
    "Hammer Curls",
  ].map(createTemplateExercise);

  templates.push({
    id: generateId(),
    name: "Pull Day 1",
    exercises: pullDay1Exercises,
  });

  // Pull Day 2 Template
  const pullDay2Exercises = [
    "Pull-ups",
    "Cable Rows",
    "Wide-Grip Lat Pulldown",
    "Preacher Curl",
    "Reverse Flyes",
    "Hammer Curls",
  ].map(createTemplateExercise);

  templates.push({
    id: generateId(),
    name: "Pull Day 2",
    exercises: pullDay2Exercises,
  });

  // Leg Day 1 Template
  const legsDay1Exercises = [
    "Barbell Squat",
    "Romanian Deadlift",
    "Leg Extensions",
    "Walking, Lunge",
    "Calf Press",
    "Glute Ham Raise",
  ].map(createTemplateExercise);

  templates.push({
    id: generateId(),
    name: "Leg Day 1",
    exercises: legsDay1Exercises,
  });

  // Leg Day 2 Template
  const legsDay2Exercises = [
    "Leg Press",
    "Bulgarian Split Squat",
    "Lying Leg Curls",
    "Walking, Lunge",
    "Seated Calf Raise",
    "Glute Ham Raise",
  ].map(createTemplateExercise);

  templates.push({
    id: generateId(),
    name: "Leg Day 2",
    exercises: legsDay2Exercises,
  });

  return templates;
}

export function generatePPLWorkoutHistory(): CompletedWorkout[] {
  const workouts: CompletedWorkout[] = [];
  const today = new Date();
  const threeMonthsAgo = new Date(today);
  threeMonthsAgo.setMonth(today.getMonth() - 3);

  // Generate workouts following PPL schedule
  const schedule: ("push" | "pull" | "legs")[] = [
    "push",
    "pull",
    "legs",
    "push",
    "pull",
    "legs",
  ];
  let scheduleIndex = 0;

  // Start from 3 months ago
  const currentDate = new Date(threeMonthsAgo);
  let weekNumber = 0;

  while (currentDate <= today) {
    const dayOfWeek = currentDate.getDay(); // 0 = Sunday, 1 = Monday, etc.

    // Skip Sundays (rest day)
    if (dayOfWeek !== 0) {
      // Occasionally skip a day for realism (life happens)
      if (Math.random() > 0.95) {
        currentDate.setDate(currentDate.getDate() + 1);
        continue;
      }

      const workoutType = schedule[scheduleIndex];

      // Safety check to ensure workoutType is defined
      if (!workoutType) {
        scheduleIndex = 0;
        continue;
      }

      // Calculate week number from start
      const weeksSinceStart = Math.floor(
        (currentDate.getTime() - threeMonthsAgo.getTime()) /
          (7 * 24 * 60 * 60 * 1000)
      );
      weekNumber = weeksSinceStart;

      // Determine day variation (alternates each week)
      const currentVariation = ((Math.floor(weekNumber / 1) % 2) + 1) as 1 | 2;

      // Create workout with some time variation (not always same time)
      const workoutTime = new Date(currentDate);
      const randomHour = 17 + Math.floor(Math.random() * 4); // 5-8 PM range
      const randomMinute = Math.floor(Math.random() * 60);
      workoutTime.setHours(randomHour, randomMinute, 0, 0);

      const workout = createWorkout(
        workoutType,
        workoutTime,
        weekNumber,
        currentVariation as 1 | 2
      );
      workouts.push(workout);

      scheduleIndex = (scheduleIndex + 1) % schedule.length;
    }

    currentDate.setDate(currentDate.getDate() + 1);
  }

  return workouts;
}
