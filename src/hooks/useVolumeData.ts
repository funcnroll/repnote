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

  return { weeklySetsData, weeklyRepsData, weeklyWeightData };
}
