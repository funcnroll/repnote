import { getWeeklyCompletedSetData } from "@/helpers/getWeeklyCompletedSetData";
import { useStatisticsData } from "./useStatisticsData";

export function useConsistencyData() {
  const { weeksArr } = useStatisticsData();

  const weeklySetComparisonData = weeksArr.map((week, index) => {
    const completed = getWeeklyCompletedSetData(week);
    const total = week.reduce((acc, workout) => acc + workout.sets, 0);

    return {
      week: index + 1,
      completedSets: completed,
      missedSets: total - completed,
    };
  });

  const weeklyDuration = weeksArr.map((week, index) => {
    const duration = week.reduce((acc, w) => acc + w.duration, 0);
    const totalMinutes = Math.round(duration / 60);
    const averageMinutes =
      week.length > 0 ? Math.round(totalMinutes / week.length) : null;

    return {
      week: index + 1,
      totalMinutes,
      averageMinutes,
    };
  });

  const weeklyAdherence = weeksArr.map((week, index) => {
    const totalSets = week.reduce((acc, w) => acc + w.sets, 0);

    const completedSets = week.reduce(
      (acc, w) =>
        acc +
        w.exercises.reduce(
          (exAcc, ex) =>
            exAcc +
            ex.sets.reduce((setAcc, s) => setAcc + (s.completed ? 1 : 0), 0),
          0
        ),
      0
    );

    const adherence =
      totalSets > 0 ? Math.round((completedSets / totalSets) * 100) : null;

    return {
      week: index + 1,
      adherence,
    };
  });

  return {
    weeklySetComparisonData,
    weeklyDuration,
    weeklyAdherence,
  };
}
