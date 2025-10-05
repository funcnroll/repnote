import { loadRecentWorkoutsFromLocalStorage } from "@/app/localStorage";
import { getWeeklyCompletedSetData } from "@/helpers/getWeeklyCompletedSetData";
import { CompletedWorkout } from "@/types/CompletedWorkout";
import { StatisticsWeeks } from "@/types/StatisticsWeeks";
import { differenceInCalendarWeeks } from "date-fns";

export function useStatisticsData(): {
  weeksArr: CompletedWorkout[][];
  sortedData: CompletedWorkout[];
  weeklyPreviewSetData: { week: number; value: number }[];
  weeklyPreviewConsistencyData: { week: number; value: number }[];
  weeklyPreviewWeightData: { week: number; value: number | null }[];
} {
  const data = loadRecentWorkoutsFromLocalStorage();

  const sortedData = data.sort(
    (a, b) => new Date(a.timestamp).getTime() - new Date(b.timestamp).getTime()
  );

  const firstDate = new Date(sortedData[0]!?.timestamp);

  const weeks: StatisticsWeeks = {};

  for (const workout of sortedData) {
    const day = new Date(workout.timestamp);

    // Get the number of weeks between the first workout and the current workout
    const weeksSinceStart = differenceInCalendarWeeks(day, firstDate, {
      weekStartsOn: 1, // Monday
    });

    // Create array if not there yet, then push
    if (!weeks[weeksSinceStart]) {
      weeks[weeksSinceStart] = [];
    }

    weeks[weeksSinceStart].push(workout);
  }

  const weeksArr = Object.values(weeks);

  const weeklyPreviewWeightData = weeksArr.map((week, index) => {
    // Grab the first exercise name of the first workout of the first week
    const defaultExercise =
      weeksArr?.[0]?.[0]?.exercises[0]?.exerciseName || null;

    // Find the exercise in all weeks
    const matchingSet = week.map((workout) => {
      return workout.exercises.filter(
        (ex) => ex.exerciseName === defaultExercise
      );
    });

    const weeklyPreviewmaxWeight = matchingSet
      .flatMap((ex) => ex.map((e) => e.sets.map((s) => s.weight)))
      .flat();

    // Ensure there are no nulls for type safety
    const nums = weeklyPreviewmaxWeight.filter((n): n is number => n !== null);

    // If no number is present, return null (recharts can handle it)
    const maxWeight =
      weeklyPreviewmaxWeight.length > 0 ? Math.max(...nums) : null;

    return {
      value: maxWeight,
      week: index,
    };
  });

  const weeklyPreviewConsistencyData = weeksArr.map((week, index) => {
    const minutes = Math.round(
      week.reduce((acc, workout) => acc + workout.duration, 0) / 60
    );

    return { week: index, value: minutes };
  });

  const weeklyPreviewSetData = weeksArr.map((week, index) => {
    return {
      value: getWeeklyCompletedSetData(week),
      week: index,
    };
  });

  return {
    sortedData,
    weeksArr,
    weeklyPreviewSetData,
    weeklyPreviewConsistencyData,
    weeklyPreviewWeightData,
  };
}
