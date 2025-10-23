import { getWeeklyCompletedSetData } from "@/helpers/getWeeklyCompletedSetData";
import { useStatisticsData } from "./useStatisticsData";

export function useVolumeData() {
  const { weeksArr } = useStatisticsData();

  const weeklySetsData = weeksArr.map((week, index) => ({
    week: index + 1,
    completedSets: getWeeklyCompletedSetData(week),
  }));

  const weeklyRepsData = weeksArr.map((week, index) => ({
    week: index + 1,
    completedReps: week.reduce(
      (acc, workout) =>
        acc +
        workout.exercises.reduce(
          (exAcc, ex) =>
            exAcc +
            ex.sets.reduce((setAcc, set) => setAcc + (set.actualReps || 0), 0),
          0
        ),
      0
    ),
  }));

  const weeklyWeightData = weeksArr.map((week, index) => ({
    week: index + 1,
    completedWeight: Math.round(
      week.reduce(
        (acc, workout) =>
          acc +
          workout.exercises.reduce(
            (exAcc, ex) =>
              exAcc +
              ex.sets.reduce(
                (setAcc, set) =>
                  setAcc +
                  (set.completed
                    ? (set.weight || 0) * (set.actualReps || 0)
                    : 0),
                0
              ),
            0
          ),
        0
      )
    ),
  }));

  const categoryRules: Record<string, string> = {
    chest: "Chest",
    shoulders: "Shoulders",
    triceps: "Arms",
    biceps: "Arms",
    forearms: "Arms",
    lats: "Back",
    traps: "Back",
    "middle back": "Back",
    "lower back": "Back",

    quadriceps: "Legs",
    hamstrings: "Legs",
    calves: "Legs",
    abductors: "Legs",
    adductors: "Legs",
    glutes: "Legs",

    abdominals: "Core",

    neck: "Other",
  };

  const totalSetsMuscleGroup: Record<string, number> = {};

  // Add up primary muscles by 1
  weeksArr.map((week) => {
    week.flatMap((workout) =>
      workout.exercises.map((ex) =>
        ex.primaryMuscles?.forEach((muscle) => {
          const category = categoryRules[muscle] || muscle; // Better to be safe
          totalSetsMuscleGroup[category] =
            (totalSetsMuscleGroup[category] || 0) + 1;
        })
      )
    );
  });

  // Add up secondary muscles by 0.25
  // 0.5 is more realistic but fills up the radar chart with arms and shoulders
  weeksArr.map((week) => {
    week.flatMap((workout) =>
      workout.exercises.map((ex) =>
        ex.secondaryMuscles?.forEach((muscle) => {
          const category = categoryRules[muscle] || muscle;

          totalSetsMuscleGroup[category] =
            (totalSetsMuscleGroup[category] || 0) + 0.25;
        })
      )
    );
  });

  const categoryOrder = ["Shoulders", "Back", "Legs", "Arms", "Chest"];

  const radarData = categoryOrder.map((category) => ({
    category,
    sets: totalSetsMuscleGroup[category],
  }));

  return { weeklySetsData, weeklyRepsData, weeklyWeightData, radarData };
}
