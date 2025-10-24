import { CompletedWorkout } from "../../types/CompletedWorkout";
import { Exercise } from "../../types/Exercise";
import { Set } from "../../types/Set";
import { generateId } from "../../helpers/generateId";
import { Template } from "../../app/templateSlice";
import exercisesRaw from "../../data/exercises.json";
import { ExerciseFromDB } from "../../types/ExerciseFromDB";

const exercises: ExerciseFromDB[] = exercisesRaw as ExerciseFromDB[];

// Push / Pull / Legs exercise pools
const PPL_EXERCISES = {
  push: [
    // Compounds
    { name: "Barbell Bench Press - Medium Grip", isCompound: true },
    { name: "Incline Dumbbell Press", isCompound: true },
    { name: "Dumbbell Shoulder Press", isCompound: true },
    { name: "Close-Grip Barbell Bench Press", isCompound: true },

    // Accessories
    { name: "Incline Dumbbell Flyes", isCompound: false },
    { name: "Side Lateral Raise", isCompound: false },
    { name: "Machine Triceps Extension", isCompound: false },
    { name: "Front Two-Dumbbell Raise", isCompound: false },
  ],
  pull: [
    // Compounds
    { name: "Barbell Deadlift", isCompound: true },
    { name: "Wide-Grip Lat Pulldown", isCompound: true },
    { name: "T-Bar Row with Handle", isCompound: true },
    { name: "Pullups", isCompound: true },

    // Accessories
    { name: "Seated Cable Rows", isCompound: false },
    { name: "Hammer Curls", isCompound: false },
    { name: "Barbell Curl", isCompound: false },
    { name: "Face Pull", isCompound: false },
    { name: "Reverse Flyes", isCompound: false },
    { name: "Machine Preacher Curls", isCompound: false },
  ],
  legs: [
    // Compounds
    { name: "Barbell Squat", isCompound: true },
    { name: "Romanian Deadlift", isCompound: true },
    { name: "Leg Press", isCompound: true },

    // Accessories
    { name: "Leg Extensions", isCompound: false },
    { name: "Lying Leg Curls", isCompound: false },
    { name: "Calf Press", isCompound: false },
    { name: "Seated Calf Raise", isCompound: false },
  ],
};

// Starting weights + weekly progression
const EXERCISE_PROGRESSIONS = {
  "Barbell Bench Press - Medium Grip": { startWeight: 30, weeklyIncrease: 2.5 },
  "Barbell Squat": { startWeight: 80, weeklyIncrease: 2.5 },
  "Barbell Deadlift": { startWeight: 100, weeklyIncrease: 2.5 },
  "Incline Dumbbell Press": { startWeight: 30, weeklyIncrease: 2.5 },
  "Dumbbell Shoulder Press": { startWeight: 20, weeklyIncrease: 1.25 },
  "Wide-Grip Lat Pulldown": { startWeight: 40, weeklyIncrease: 2.5 },
  "T-Bar Row with Handle": { startWeight: 45, weeklyIncrease: 2.5 },
  "Romanian Deadlift": { startWeight: 130, weeklyIncrease: 2.5 },
  "Leg Press": { startWeight: 160, weeklyIncrease: 5 },
  "Close-Grip Barbell Bench Press": { startWeight: 40, weeklyIncrease: 1.25 },
  Pullups: { startWeight: 0, weeklyIncrease: 1.25 },

  // Isolations
  "Incline Dumbbell Flyes": { startWeight: 10, weeklyIncrease: 1.25 },
  "Side Lateral Raise": { startWeight: 5, weeklyIncrease: 1.25 },
  "Dips - Triceps Version": { startWeight: 0, weeklyIncrease: 1.25 },
  "Machine Triceps Extension": { startWeight: 10, weeklyIncrease: 1.25 },
  "Seated Cable Rows": { startWeight: 40, weeklyIncrease: 1.25 },
  "Hammer Curls": { startWeight: 10, weeklyIncrease: 1.25 },
  "Barbell Curl": { startWeight: 30, weeklyIncrease: 1.25 },
  "Face Pull": { startWeight: 20, weeklyIncrease: 1.25 },
  "Leg Extensions": { startWeight: 40, weeklyIncrease: 1.25 },
  "Lying Leg Curls": { startWeight: 60, weeklyIncrease: 1.25 },
  "Calf Press": { startWeight: 60, weeklyIncrease: 2.5 },
  "Seated Calf Raise": { startWeight: 20, weeklyIncrease: 1.25 },

  default: { startWeight: 35, weeklyIncrease: 1.25 },
};

function getExerciseWeight(exerciseName: string, weekNumber: number): number {
  const progression =
    EXERCISE_PROGRESSIONS[exerciseName as keyof typeof EXERCISE_PROGRESSIONS] ||
    EXERCISE_PROGRESSIONS.default;
  return progression.startWeight + progression.weeklyIncrease * weekNumber;
}

function getRepRange(
  exerciseName: string,
  isCompound: boolean,
  workoutType?: "push" | "pull" | "legs"
): { min: number; max: number; sets: number } {
  if (isCompound) {
    if (workoutType === "legs") return { min: 6, max: 8, sets: 2 };
    return { min: 6, max: 8, sets: 4 };
  }
  const isoHighRep = [
    "Side Lateral Raise",
    "Face Pull",
    "Calf Press",
    "Seated Calf Raise",
  ];
  if (isoHighRep.some((ex) => exerciseName.includes(ex))) {
    return { min: 12, max: 15, sets: 3 };
  }
  return { min: 8, max: 12, sets: 3 };
}

// Generate a single set
function createExerciseSet(
  exerciseName: string,
  weekNumber: number,
  isCompound: boolean,
  setNumber: number,
  isPartialWorkout: boolean
): Set {
  const weight = getExerciseWeight(exerciseName, weekNumber);
  const { min, max } = getRepRange(exerciseName, isCompound);
  const baseReps = Math.floor(Math.random() * (max - min + 1)) + min;
  const fatigueDrop = Math.floor(Math.random() * setNumber);
  const wiggleRoom = Math.floor(Math.random() * 3) - 1;
  const finalTargetReps = Math.max(1, baseReps - fatigueDrop + wiggleRoom);

  const isBodyweight = weight === 0;
  let actualReps = finalTargetReps;
  if (isBodyweight && weekNumber > 0) {
    const repProgression = Math.floor(weekNumber / 4);
    actualReps = Math.min(finalTargetReps + repProgression, 15);
  }

  let completed = true;
  if (isPartialWorkout && setNumber > 2 && Math.random() < 0.6) {
    completed = false;
  }

  return {
    id: setNumber,
    reps: finalTargetReps,
    weight: isBodyweight ? null : weight,
    actualReps: completed ? actualReps : null,
    completed,
  };
}

// Generate an exercise with all its sets
function createWorkoutExercise(
  exerciseName: string,
  weekNumber: number,
  isPartialWorkout: boolean,
  workoutType: "push" | "pull" | "legs"
): Exercise {
  const exerciseData =
    PPL_EXERCISES.push.find((ex) => ex.name === exerciseName) ||
    PPL_EXERCISES.pull.find((ex) => ex.name === exerciseName) ||
    PPL_EXERCISES.legs.find((ex) => ex.name === exerciseName);

  if (!exerciseData) throw new Error(`Exercise not found: ${exerciseName}`);

  const { sets: numSets } = getRepRange(
    exerciseName,
    exerciseData.isCompound,
    workoutType
  );
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

// Generate one workout
function createWorkout(
  workoutType: "push" | "pull" | "legs",
  workoutDate: Date,
  weekNumber: number,
  dayVariation: 1 | 2
): CompletedWorkout {
  const isPartialWorkout = Math.random() < 0.2;

  let exerciseSelection: string[] = [];
  if (workoutType === "push") {
    exerciseSelection =
      dayVariation === 1
        ? [
            "Barbell Bench Press - Medium Grip",
            "Incline Dumbbell Press",
            "Dumbbell Shoulder Press",
            "Incline Dumbbell Flyes",
            "Side Lateral Raise",
            "Machine Triceps Extension",
          ]
        : [
            "Incline Dumbbell Press",
            "Close-Grip Barbell Bench Press",
            "Dumbbell Shoulder Press",
            "Incline Dumbbell Flyes",
            "Front Two-Dumbbell Raise",
          ];
  } else if (workoutType === "pull") {
    exerciseSelection =
      dayVariation === 1
        ? [
            "Barbell Deadlift",
            "Wide-Grip Lat Pulldown",
            "T-Bar Row with Handle",
            "Barbell Curl",
            "Face Pull",
            "Hammer Curls",
          ]
        : [
            "Pullups",
            "Seated Cable Rows",
            "T-Bar Row with Handle",
            "Machine Preacher Curls",
            "Reverse Flyes",
            "Hammer Curls",
          ];
  } else {
    exerciseSelection =
      dayVariation === 1
        ? ["Barbell Squat", "Romanian Deadlift", "Leg Extensions", "Calf Press"]
        : ["Leg Press", "Lying Leg Curls", "Seated Calf Raise"];
  }

  const workoutExercises: Exercise[] = exerciseSelection.map((name) =>
    createWorkoutExercise(name, weekNumber, isPartialWorkout, workoutType)
  );

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

// EXPORTS

function getTotalWeeksOfHistory(): number {
  const today = new Date();
  const threeMonthsAgo = new Date(today);
  threeMonthsAgo.setMonth(today.getMonth() - 3);

  const diffWeeks = Math.floor(
    (today.getTime() - threeMonthsAgo.getTime()) / (7 * 24 * 60 * 60 * 1000)
  );

  return Math.max(diffWeeks, 1); // at least 1 week
}

// Templates (for UI use)
export function generatePPLTemplates(): Template[] {
  const lastWeek = getTotalWeeksOfHistory() - 1;

  function buildExercise(name: string, workoutType: "push" | "pull" | "legs") {
    const exData =
      PPL_EXERCISES.push.find((e) => e.name === name) ||
      PPL_EXERCISES.pull.find((e) => e.name === name) ||
      PPL_EXERCISES.legs.find((e) => e.name === name);

    if (!exData) throw new Error(`Exercise not found: ${name}`);

    const { sets, min, max } = getRepRange(
      name,
      exData.isCompound,
      workoutType
    );

    const plannedWeight = getExerciseWeight(name, lastWeek);

    return {
      id: generateId(),
      exerciseName: name,
      sets: Array.from({ length: sets }, (_, i) => ({
        id: i + 1,
        reps: Math.max(min, max - i),
        weight: plannedWeight,
        completed: false,
        actualReps: null,
      })),
    };
  }

  return [
    {
      id: generateId(),
      name: "Push Day 1",
      exercises: [
        "Barbell Bench Press - Medium Grip",
        "Incline Dumbbell Press",
        "Dumbbell Shoulder Press",
        "Incline Dumbbell Flyes",
        "Side Lateral Raise",
        "Machine Triceps Extension",
      ].map((name) => buildExercise(name, "push")),
    },
    {
      id: generateId(),
      name: "Push Day 2",
      exercises: [
        "Incline Dumbbell Press",
        "Close-Grip Barbell Bench Press",
        "Dumbbell Shoulder Press",
        "Incline Dumbbell Flyes",
        "Front Two-Dumbbell Raise",
      ].map((name) => buildExercise(name, "push")),
    },
    {
      id: generateId(),
      name: "Pull Day 1",
      exercises: [
        "Barbell Deadlift",
        "Wide-Grip Lat Pulldown",
        "T-Bar Row with Handle",
        "Barbell Curl",
        "Face Pull",
        "Hammer Curls",
      ].map((name) => buildExercise(name, "pull")),
    },
    {
      id: generateId(),
      name: "Pull Day 2",
      exercises: [
        "Pullups",
        "Seated Cable Rows",
        "T-Bar Row with Handle",
        "Machine Preacher Curls",
        "Reverse Flyes",
        "Hammer Curls",
      ].map((name) => buildExercise(name, "pull")),
    },
    {
      id: generateId(),
      name: "Leg Day 1",
      exercises: [
        "Barbell Squat",
        "Romanian Deadlift",
        "Leg Extensions",
        "Calf Press",
      ].map((name) => buildExercise(name, "legs")),
    },
    {
      id: generateId(),
      name: "Leg Day 2",
      exercises: ["Leg Press", "Lying Leg Curls", "Seated Calf Raise"].map(
        (name) => buildExercise(name, "legs")
      ),
    },
  ];
}

// Workout history (seeded log)
export function generatePPLWorkoutHistory(): CompletedWorkout[] {
  const workouts: CompletedWorkout[] = [];
  const today = new Date();
  const threeMonthsAgo = new Date(today);
  threeMonthsAgo.setMonth(today.getMonth() - 3);

  // More push days -> chest bias
  const schedule: ("push" | "pull" | "legs")[] = [
    "push",
    "pull",
    "legs",
    "push",
    "pull",
    "push",
  ];
  let scheduleIndex = 0;

  const currentDate = new Date(threeMonthsAgo);
  let weekNumber = 0;

  while (currentDate <= today) {
    const dayOfWeek = currentDate.getDay();
    if (dayOfWeek !== 0) {
      if (Math.random() > 0.95) {
        currentDate.setDate(currentDate.getDate() + 1);
        continue;
      }

      const workoutType = schedule[scheduleIndex];
      if (!workoutType) {
        scheduleIndex = 0;
        continue;
      }

      const weeksSinceStart = Math.floor(
        (currentDate.getTime() - threeMonthsAgo.getTime()) /
          (7 * 24 * 60 * 60 * 1000)
      );
      weekNumber = weeksSinceStart;

      const currentVariation = ((Math.floor(weekNumber / 1) % 2) + 1) as 1 | 2;

      const workoutTime = new Date(currentDate);
      workoutTime.setHours(
        17 + Math.floor(Math.random() * 4),
        Math.floor(Math.random() * 60),
        0,
        0
      );

      const workout = createWorkout(
        workoutType,
        workoutTime,
        weekNumber,
        currentVariation
      );
      workouts.push(workout);

      scheduleIndex = (scheduleIndex + 1) % schedule.length;
    }
    currentDate.setDate(currentDate.getDate() + 1);
  }

  return workouts;
}
